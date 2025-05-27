const userModel = require("../models/user.model");

const transporter = require("../config/email.config");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  async signupUser(req, res) {
    try {
      const { firstName, lastName, email, age } = req.body;
      let randomPassowrd = Math.random().toString(36).slice(-8);
      
      
      let userName =  Math.random().toString(36).slice(-8);
    

      const hasedPassword =  bcrypt.hashSync(
        randomPassowrd,
        10
      );
    

      if (!firstName || !lastName || !email || !age) {
        return res.status(400).json({
          success: false,
          message: "All Feild Required",
        });
      }

      let isEmailExist = await userModel.findOne({ email });
    
      if (isEmailExist) {
        return res.status(400).json({
          success: false,
          message: "Email Already Exists",
        });
      }
    

      let user = await userModel.create({
        firstName,
        lastName,
        email,
        age,
        userName,
        password: hasedPassword,
      });

      if (user) {
        const mailOptions = {
          to: email,
          subject: "user credentials",
          html: `<p>Hello ${user.firstName},</p>
                <h1>User Name</h1>
                <p href="" style="display: inline-block; font-size:20px; border-radius: 5px;">${user.userName}</p>
                <h1>password</h1>
                <p href="" style="display: inline-block; font-size:20px; border-radius: 5px;">${randomPassowrd}</p>
                
                <p>This link will expire in 1 hour.</p>
                
                <p>Thank you!</p>
                <p>Best regards,</p>
                <p>Team XYZ</p>
                <p><small>This is an automatically generated email. Please do not reply to this email.</small></p>
                <p><small>© 2025 Team Papai. All rights reserved.</small></p>
                <p><small>Powered by Papai</small></p>
                <p><small>Version 1.0</small></p>`,
        };
        await transporter.sendMail(mailOptions);
      }

      if (user) {
        return res.status(200).json({
          success: true,
          message: "User Created Successfully",
          user: {
            id: user._id,
            firstName,
            lastName,
            email,
            age,
            userName,
            message: "login credentaials send to your email",
          },
        });
      }
    } catch (error) {
      console.error("Error in createUser:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { userNameOrEmail, password } = req.body;
 
      if (!userNameOrEmail || !password) {
        return res.status(400).json({
          status: false,
          message: "Email or Username and password are required",
        });
      }
  
      // Search user by email or username
      const users = await userModel.aggregate([
        {
          $match: {
            isDeleted: false,
            $or: [
              { email: userNameOrEmail },
              { userName: userNameOrEmail }
            ]
          }
        }
      ]);
  
      const user = users[0];
    
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
      });
    } catch (e) {
      console.error("Error in loginUser:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async userDetails(req, res) {
    try {
      const { id } = req.params;

      let user = await userModel.findOne({ _id: id });

      if (user) {
        return res.status(200).json({
          status: true,
          message: "User Details Fetched Successfully",
          user: {
            id: user._id,
            name: user.name,
            isVerified: user.isVerified,
            email: user.email,
            profilePic: user.profilePic,
          },
        });
      }
    } catch (err) {
      console.log("Server Error", err);
    }
  }
}

module.exports = new AuthController();
