    <template>
    <div>
        <div class="container">
            <div class="row1">
                <!--left part-->
                <form class="column1" action="" method="POST" @submit.prevent="editProfile">
                    <h3 class="header">My Profile</h3>
                    <hr class="hr-left">

                    <!--bottom part-->
                    <div class="left1">
                        <label for="email">Email</label><br>
                        <input  type="text" placeholder="" name="email" required v-model="email"><br>
                
                        <label for="">Username</label><br>
                        <input type="text" placeholder="" name="username" v-model="username"  required><br>
                
                        <label for="">Mobile Number</label><br>
                        <input type="text" placeholder="" name="mobile number" v-model="phoneNumber">
                    </div>

                    <input type="submit" name=""  value="Save" class="btn2">
                </form>
                <!--right part-->
                <form class="column2" action="" method="POST" @submit.prevent="setNewPassword">
                    <h3 class="header">Password</h3>
                    <hr class="hr-right">

                    <div class="right1">
                        <label for="">Current Password</label>
                        <input type="password" v-model="currpassword" placeholder="" name="current-password"  required><br>

                        <label for="">New Password</label>
                        <input type="password" v-model="newpassword" placeholder="" name="new-password"  required>

                        <label for="">Confirm Password</label>
                        <input type="password" v-model="conpassword" name="confirmpassword"  required>
                    </div>

                    <input type="submit" name=""  value="Save" class="btn1">
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { FormValidation, localhost } from '../../utils/FormValidation'

export default {
    name: 'edit_user',
    title:"My Profile",
    data(){
        return{
            user:"",
            dataset:{},
            username:"",
            email:"",
            phoneNumber:"",
            currpassword:"",
            newpassword:"",
            conpassword:"",
            result:"",
            err:false,
        }
    },
    async mounted(){
        this.user = this.$store.getters["auth/getSession"];
        var response =await axios.get(localhost+"/profile/"+this.user.userid);
        this.setData(response.data[0])
    },
    methods: {
        setData(response){
            this.dataset =response;
            this.email = this.dataset.users.email;
            this.username =this.dataset.users.username;
            this.phoneNumber = this.dataset.phoneNumber; 
        },
        async setNewPassword(){
            var checkpassword = new FormValidation();
            checkpassword._setPassword(this.newpassword);
            checkpassword._setConfirmPassword(this.conpassword);
            if(checkpassword.checkPassword()){
                var response = await axios.post(localhost+"/setnewpassword/"+this.user.userid,
                {   
                    current: this.currpassword,
                    newpassword:this.newpassword,
                }
                );
                this.err = response.data.err;
                if(this.err){
                    alert(response.data.result);
                }else{
                    alert(response.data.result);
                    this.conpassword="";
                    this.currpassword="";
                    this.newpassword="";
                }
    
            }else{
                alert("Confirm and New Password are not matched")
            }

        },
        async editProfile(){
            var response = await axios.put(localhost+"/profile/"+this.user.userid,
            {
                email:this.email,
                username:this.username,
                phoneNumber:this.phoneNumber,
            }
            );
            if(response.data.err){
                alert(response.data.result);
            }else{
              this.setData(response.data[0])
              alert("Profile change successful")
            }
        }
    },

}
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
 * {
        box-sizing: border-box;
    }

    .row1 {
        display: flex;
    }

    /* Create two equal columns that sits next to each other */
    .column1 {
        flex: 60%;
        padding: 10px;
        height: 300px; /* Should be removed. Only for demonstration */
    }
    .column2 {
        flex: 40%;
        padding: 10px;
        height: 300px; /* Should be removed. Only for demonstration */
    }    
    .header{
        color: #D60265;
        font-weight: bold;
        text-align: center;
        padding: 15px;
    }

    /* Full-width input fields */
    input[type=text], input[type=password] {
        width: 90%;
        padding: 15px;
        margin: 5px 0 30px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }

    input[type=text]:focus, input[type=password]:focus {
        background-color: #ddd;
        outline: none;
    }

    /* Overwrite default styles of hr */
    .hr-left {
        color: gainsboro;
        margin-left: 10%;
        width: 80%;
    }

    /* Add a blue text color to links */
    a {
        color: dodgerblue;
    }
    .left1{
        margin-left: 10%;
    }
    .hr-right{
        color: gainsboro; 
        width: 90%;
        margin-left: 0;
    }
    .btn1{
        @extend .btn;
        color: white;
        background-color: #D60265;
        float: right;
        font-size: 20px;
        box-shadow: $shadow_1;
        &:hover,&:focus{
            box-shadow: $shadow_2;
            color:white;
            background-color:  #e4267f;
        }
    }

    .btn2{
        @extend .btn;
        color: white;
        float: right;
        background-color: #D60265;
        font-size: 20px;
        box-shadow: $shadow_1;
        &:hover,&:focus{
            box-shadow: $shadow_2;
            color:white;
            background-color:  #e4267f;
        }
    }

</style>