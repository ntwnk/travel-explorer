const ApplicationForm = {
template: `
    <section class="section-card" id="application">
    <h2>Job Application</h2>

    <form 
        method="post"
        action="http://mercury.swin.edu.au/COS30043/formtest.php"
        @submit="validateForm">

        <fieldset>
        <legend>Personal Information</legend>

        <div class="row">
            <div class="col-md-6 mb-3">
            <label>First Name:</label>
            <input type="text" name="firstName" class="form-control" v-model="form.firstName">
            <div class="error">{{ errors.firstName }}</div>
            </div>

            <div class="col-md-6 mb-3">
            <label>Last Name:</label>
            <input type="text" name="lastName" class="form-control" v-model="form.lastName">
            <div class="error">{{ errors.lastName }}</div>
            </div>
        </div>

        <div class="mb-3">
            <label>Date of Birth:</label>
            <input type="date" name="dob" class="form-control" v-model="form.dob">
            <div class="error">{{ errors.dob }}</div>
        </div>
        </fieldset>

        <fieldset>
        <legend>Account Details</legend>

        <div class="row">
            <div class="col-md-6 mb-3">
            <label>Username:</label>
            <input type="text" name="username" class="form-control" v-model="form.username">
            <div class="error">{{ errors.username }}</div>
            </div>

            <div class="col-md-6 mb-3">
            <label>Password:</label>
            <input type="password" name="password" class="form-control" v-model="form.password">
            <div class="error">{{ errors.password }}</div>
            </div>

            <div class="col-md-6 mb-3">
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" class="form-control" v-model="form.confirmPassword">
            <div class="error">{{ errors.confirmPassword }}</div>
            </div>

            <div class="col-md-6 mb-3">
            <label>Email:</label>
            <input type="text" name="email" class="form-control" v-model="form.email">
            <div class="error">{{ errors.email }}</div>
            </div>
        </div>
        </fieldset>

        <fieldset>
        <legend>Address</legend>

        <div class="row">
            <div class="col-md-6 mb-3">
            <label>Street Address:</label>
            <input type="text" name="streetAddress" class="form-control" v-model="form.streetAddress">
            <div class="error">{{ errors.streetAddress }}</div>
            </div>

            <div class="col-md-6 mb-3">
            <label>Suburb:</label>
            <input type="text" name="suburb" class="form-control" v-model="form.suburb">
            <div class="error">{{ errors.suburb }}</div>
            </div>

            <div class="col-md-6 mb-3">
            <label>Postcode:</label>
            <input type="text" name="postcode" class="form-control" v-model="form.postcode">
            <div class="error">{{ errors.postcode }}</div>
            </div>

            <div class="col-md-6 mb-3">
            <label>Mobile Number:</label>
            <input type="text" name="mobile" class="form-control" v-model="form.mobile">
            <div class="error">{{ errors.mobile }}</div>
            </div>
        </div>
        </fieldset>

        <div class="mb-3">
        <label>Preferred Job Category:</label>
        <select name="jobCategory" class="form-select" v-model="form.jobCategory">
            <option value="">-- Please select --</option>
            <option value="AI">AI</option>
            <option value="Data Science">Data Science</option>
            <option value="Web Development">Web Development</option>
            <option value="Cloud">Cloud</option>
        </select>
        <div class="error">{{ errors.jobCategory }}</div>
        </div>

        <button type="button" class="btn btn-secondary me-2" @click="showTerms = !showTerms">
        Terms and Conditions
        </button>

        <button type="submit" class="btn btn-primary">
        Submit
        </button>

        <div v-if="showTerms" class="alert alert-info mt-3">
        By submitting this form, you agree that the information provided is accurate
        and may be used for job application testing purposes.
        </div>
    </form>
    </section>
`,

data() {
    return {
    showTerms: false,

    form: {
        firstName: "",
        lastName: "",
        dob: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        streetAddress: "",
        suburb: "",
        postcode: "",
        mobile: "",
        jobCategory: ""
    },

    errors: {}
    };
},

methods: {
    validateForm(event) {
    this.errors = {};

    const lettersOnly = /^[A-Za-z]+$/;
    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    const passwordPattern = /^(?=.*[$%^&*]).{8,}$/;

    if (!this.form.firstName) {
        this.errors.firstName = "First name is required.";
    } else if (!lettersOnly.test(this.form.firstName)) {
        this.errors.firstName = "First name must contain letters only.";
    }

    if (!this.form.lastName) {
        this.errors.lastName = "Last name is required.";
    } else if (!lettersOnly.test(this.form.lastName)) {
        this.errors.lastName = "Last name must contain letters only.";
    }

    if (!this.form.username) {
        this.errors.username = "Username is required.";
    } else if (this.form.username.length < 3) {
        this.errors.username = "Username must be at least 3 characters.";
    }

    if (!this.form.password) {
        this.errors.password = "Password is required.";
    } else if (!passwordPattern.test(this.form.password)) {
        this.errors.password = "Password must be at least 8 characters and include $, %, ^, &, or *.";
    }

    if (this.form.confirmPassword !== this.form.password) {
        this.errors.confirmPassword = "Passwords do not match.";
    }

    if (!this.form.email) {
        this.errors.email = "Email is required.";
    } else if (!emailPattern.test(this.form.email)) {
        this.errors.email = "Enter a valid email address.";
    }

    if (this.form.streetAddress.length > 40) {
        this.errors.streetAddress = "Street address must be 40 characters or fewer.";
    }

    if (this.form.suburb.length > 20) {
        this.errors.suburb = "Suburb must be 20 characters or fewer.";
    }

    if (!/^\\d{4}$/.test(this.form.postcode)) {
        this.errors.postcode = "Postcode must be exactly 4 digits.";
    }

    if (!/^04\\d{8}$/.test(this.form.mobile)) {
        this.errors.mobile = "Mobile number must be exactly 10 digits and start with 04.";
    }

    if (!this.form.dob) {
        this.errors.dob = "Date of birth is required.";
    } else if (!this.isAtLeast16(this.form.dob)) {
        this.errors.dob = "Applicant must be at least 16 years old.";
    }

    if (!this.form.jobCategory) {
        this.errors.jobCategory = "Please select a job category.";
    }

    if (Object.keys(this.errors).length > 0) {
        event.preventDefault();
    }
    },

    isAtLeast16(dob) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age >= 16;
    }
}
};