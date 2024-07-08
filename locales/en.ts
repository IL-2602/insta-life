//eslint-disable max-len
export const en = {
  auth: {
    button: {
      backToSignIn: 'Back to Sign In',
      backToSignUp: 'Back to Sign Up',
      createNewPassword: 'Create new password',
      resendLink: 'Resend link',
      resendVerificationLink: 'Resend verification link',
      saveChanges: 'Save Changes',
      sendLink: 'Send Link',
      sendLinkAgain: 'Send Link Again',
      signInButton: 'Sign In',
      signUpButton: 'Sign Up',
    },
    congratulationPage: {
      congratulationText: 'Your email has been confirmed',
      h1: 'Congratulations!',
      meta_description: '',
      title: 'Congratulations!',
    },
    createNewPassword: {
      h1: 'Create New Password',
      meta_description: '',
      title: 'Create New Password',
    },
    error: {
      descriptionPostValueMax: 'Limit of the symbols is 500',
      descriptionPostValueMin: 'Description must be at least 10 characters',
      descriptionValueMax: 'Limit of the symbols is 500',
      emailIsRequiredError: 'Email is required',
      incorrectUsernameOrPasswordError: 'Incorrect username or password',
      incorrectValue: 'The password or email you entered is incorrect. Please try again',
      invalidEmailAddress: 'Invalid email address',
      invalidEmailOrPass: 'The email or password are incorrect. Please try again',
      invalidUsername: 'Invalid username or password',
      passwordIsRequiredError: 'Password is required',
      passwordMax: 'Password can not be longer than 20 characters',
      passwordMin: 'Password must be at least 6 characters',
      passwordRegex:
        'Password must contain a-z, A-Z, 0-9, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
      passwordsDontMatch: "Passwords don't match",
      passwordsMustMatch: 'Passwords must match',
      titlePostValueMax: 'Title can not be longer than 30 characters',
      titlePostValueMin: 'Title must be at least 8 characters',
      uNameRegisteredError: 'User with this username is already registered',
      userIsAdult: 'A user under 13 cannot create a profile. Privacy Policy',
      userNameIsRequiredError: 'Username is required',
      userNameMax: 'Username can not be longer than 30 characters',
      userNameMin: 'Username must be at least 6 characters',
      userNotExist: "User with this email doesn't exist",
    },
    forgotPasswordPage: {
      enterYourEmailText: 'Enter your email address and we will send you further instructions ',
      h1: 'Forgot Password?',
      linkHasBeenSentText:
        'The link has been sent by email. If you don’t receive an email send link again',
      meta_description:
        "Trouble logging in? Enter your email and we'll send you a link to get back into your account",
      title: 'Forgot Password',
    },
    form: {
      addPublicationDescription: 'Add publication descriptions',
      confirmPassword: 'Confirm Password',
      email: 'Email',
      firstname: 'First Name',
      lastname: 'Last Name',
      newPassword: 'New password',
      password: 'Password',
      passwordConfirmation: 'Password confirmation',
      passwordRule: 'Your password must be between 6 and 20 characters',
      postTitle: 'Post title',
      username: 'Username',
    },
    mergerPage: {
      h1: 'Merger of Accounts',
      mergeButton: {
        no: 'No',
        yes: 'Yes, merge',
      },
      meta_description: '',
      title: 'Merger of Accounts',
    },
    modal: {
      modalLogOutText: {
        getEmail(email: string) {
          return 'Are you really want to log out of your account ' + email + '?'
        },
      },
      modalTitle: 'Email sent',
      modalVerificationText: {
        getEmail(email: string) {
          return 'We have sent a link to confirm your email to ' + email
        },
      },
      noButton: 'No',
      notification: 'Log Out',
      yesButton: 'Yes',
    },
    privacyPolicyPage: {
      h1: 'Privacy Policy',
      meta_description: 'TEXT',
      title: 'Privacy policy',
    },
    signInPage: {
      forgotPassword: 'Forgot Password',
      h1: 'Sign In',
      meta_description:
        'Welcome back to INSTALIFE. Sign in to check out what your friends, family &amp; interests have been capturing &amp; sharing around the world',
      question: 'Don’t have an account?',
      title: 'Sign In',
    },
    signUpPage: {
      h1: 'Sign Up',
      meta_description:
        'Join INSTALIFE! Sign up to see photos, videos, stories &amp; messages from your friends, family &amp; interests around the world',
      privacyTerms:
        "I agree to the <a href='/sign-up/terms-of-service'>Terms of Service</a> and <a href='/sign-up/privacy-policy'>Privacy Policy</a>",
      privacyTermsPolicyLink: 'Privacy Policy',
      privacyTermsServiceLink: 'Terms of Service',
      privacyTermsText: 'I agree to the <1>link</1> and <2>link</2>',
      question: 'Do you have an account?',
      title: 'Sign Up',
    },
    termsOfServicePage: {
      h1: 'Terms of Service',
      meta_description: 'TEXT',
      title: 'Terms of service',
    },
    verificationPage: {
      h1: '',
      linkExpiredTitle: 'Email verification link expired',
      linkInvalidTitle: 'Email verification link invalid',
      meta_description: '',
      title: '',
      verificationText:
        'Looks like the verification link has expired. Not to worry, we can send the link again',
    },
  },
  button: {
    addAProfilePhoto: 'Add a Profile Photo',
    answer: 'Answer',
    backToPayment: 'Back to payment',
    backToProfileSettings: 'Back to Profile Settings',
    banInTheSystem: 'Ban in the system',
    copyLink: 'Copy Link',
    delete: 'Delete',
    deletePost: 'Delete Post',
    discard: 'Discard',
    editPost: 'Edit Post',
    follow: 'Follow',
    hide: 'Hide',
    linkSuccess: 'Link copied successfully',
    moreInformation: 'More information',
    next: 'Next',
    no: 'No',
    ok: 'OK',
    openDraft: 'Open Draft',
    original: 'Original',
    prev: 'Prev',
    profileSettings: 'Profile Settings',
    publish: 'Publish',
    removeUser: 'Delete User',
    save: 'Save',
    saveChanges: 'Save Changes',
    saveDraft: 'Save draft',
    selectFromComputer: 'Select from Computer',
    sendMessage: 'Send Message',
    showMore: 'Show More',
    terminateAllOtherSession: 'Terminate all other session',
    unfollow: 'Unfollow',
    yes: 'Yes',
  },
  modal: {
    addPhotoModalTitle: 'Add Photo',
    advertisingPlacement: 'Advertising placement',
    anotherReason: 'Another reason',
    areYouSureToBan: 'Are you sure to ban this user?',
    areYouSureToDelete: 'Are you sure to delete user ?',
    badBehavior: 'Bad behavior',
    banUser: 'Ban user',
    closeModalTextOne: 'Do you really want to close the creation of a publication? ',
    closeModalTextTwo: 'If you close everything will be deleted',
    closeModalTitle: 'Close',
    deletePostText: 'Are you sure you want to delete this post?',
    deletePostTitle: 'Delete Post',
    deleteUser: 'Delete user',
    deleteUserAvatar: 'Delete Photo',
    deleteUserAvatarText: 'Are you sure you want to delete the photo?',
    editPost: 'Edit Post',
    errorTransactionModalDescription: 'Transaction failed, please try again',
    errorTransactionModalTitle: 'Error',
    followersModalTitle: 'Followers',
    followersModalUnfollowTitle: 'Unfollow',
    followingModalDeleteDescription: 'Do you really want to delete a Following “URLProfile”?',
    followingModalDeleteTitle: 'Delete Following',
    followingModalTitle: 'Following',
    followingModalUnfollowDescription:
      'Do you really want to Unfollow from this user “URLProfile”?',
    postDescriptionValueMax: 'Limit of the symbols is 500',
    publicationTitle: 'Publication',
    reasonForBan: 'Reason for ban',
    search: 'Search',
    successTransactionModalDescription: 'Payment was successful!',
    successTransactionModalTitle: 'Success',
  },
  myProfile: {
    error: {
      imgFormat: 'Only .jpg, .jpeg, .png  formats are supported',
      imgLarger332: 'Image should be larger than 332x332',
      imgLess10mb: 'Max image size is 10MB',
      imgLess20mb: 'Max image size is 20MB',
      imgMoreThen10: 'Max image count 10',
    },
    followers: 'Followers',
    following: 'Following',
    pageTitle: 'My profile',
    profileSettings: 'Profile settings',
    publications: 'Publications',
  },
  post: {
    addComment: 'Add a Comment...',
    answer: 'Answer',
    cropping: 'Cropping',
    filters: 'Filters',
    hideAllAnswers: 'Hide Answers',
    hideAllComments: 'Hide All Comments',
    like: 'Like',
    noAnswers: 'No answers yet',
    noComments: 'No comments yet',
    publication: 'Publication',
    showAllAnswers: 'Show Answers',
    totalUsers: 'Registered Users',
    viewAllcomments: 'View All Comments',
  },
  profileSettings: {
    pageTitle: 'Profile settings',
    tab: {
      accountManagement: {
        accountManagementTitle: 'Account Management',
        accountType: 'Account type:',
        accountTypeBusiness: 'Business',
        accountTypeBusinessPrice: {
          perDay: '$10 per 1 Day',
          perMonth: '$100 per month',
          perWeek: '$50 per 7 Day',
        },
        accountTypePersonal: 'Personal',
        autoRenewal: 'Auto-Renewal',
        changeYourSubscription: 'Change your subscription:',
        currentSubscription: 'Current Subscription:',
        expireAt: 'Expire at',
        nextPayment: 'Next payment',
        paymentChoice: 'Or',
        transactionFailed: 'Transaction failed, please try again',
        transactionSuccess: 'Payment was successful!',
        yourSubscriptionCosts: 'Your subscription costs:',
      },
      devices: {
        activeSessions: 'Active sessions',
        devicesTitle: 'Devices',
        lastVisit: 'Last visit',
        thisDevices: 'Current device',
      },
      generalInformation: {
        error: {
          aboutMeDescription:
            'About Me must contain 0-9, A-Z, a-z, А-Я, а-я and special characters',
          aboutMeValueMax: 'Limit of the symbols is 200',
          calender: 'A user under 13 cannot create a profile.',
          calenderMin: 'Date of Birthday is required',
          descriptionValueMax: 'Limit of the symbols is 500',
          firstNameDescription: 'First Name must contain A-Z, a-z, А-Я, а-я',
          firstNameMax: 'Username can not be longer than 50 characters',
          firstNameMin: 'First name is required',
          invalidUsername: 'Name can only contain letters',
          lastNameDescription: 'Last Name must contain A-Z, a-z, А-Я, а-я',
          lastNameMax: 'Lastname can not be longer than 50 characters',
          lastNameMin: 'Last name is required',
          userNameDescription: 'Username is required',
          userNameMax: 'Username can not be longer than 30 characters',
          userNameMin: 'Username must be at least 6 characters',
        },
        form: {
          aboutMe: 'About Me',
          city: 'City',
          dateOfBirthday: 'Date of Birthday',
          email: 'Email',
          enterName: 'Enter City Name',
          firstname: 'First Name',
          lastname: 'Last Name',
          username: 'Username',
        },
        generalInformationTitle: 'General information',
      },
      myPayments: {
        dateOfPayment: 'Date of Payment',
        endDateOfSubscription: 'End date of subscription',
        myPaymentsTitle: 'My payments',
        paymentType: 'Payment Type',
        price: 'Price',
        subscriptionType: 'Subscription Type',
      },
    },
  },
  search: {
    looksEmpty: 'Oops! This place looks empty!',
    noRecent: 'No recent requests',
    recent: 'Recent requests',
  },
  sidebar: {
    create: 'Create',
    favourites: 'Favourites',
    home: 'Home',
    logOut: 'Log out',
    messenger: 'Messenger',
    myProfile: 'My Profile',
    paymentsList: 'Payments List',
    postsList: 'HomePosts list',
    publish: 'Publish',
    search: 'Search',
    statistics: 'Statistics',
    usersList: 'Users list',
  },
  time: {
    hours: 'h',
    minutes: 'min ago',
    postMinutes: 'Minutes ago',
  },
  toast: {
    deletePost: 'The post has been deleted',
    noDeletePost: 'Error: The post has not been deleted',
    profileError: 'Error! Server is not available!',
    profileSaveChanges: 'Your settings are saved!',
  },
}

export type Local = typeof en
