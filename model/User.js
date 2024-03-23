import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require : [true, "name is required"],
  },
  email: {
    type : String,
    unique : true,
    required : [true, "email is required"],
    validate : {
        validator : function(value){
            var regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            return regex.test(value);
        },
        message : "Please write correct email"
    }
  },
  password: {
    type: String,
    select : false,
    minlength : [6, "Password should be minimum of length 6"],
  },
  profilePicture: {
    type: String,
    required: [true, "Profile Image is required"],
  },
  otp : {
    type : String,
    default : null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

export default User;
