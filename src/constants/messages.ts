export const Messages ={
    passwordPattern: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
}

export const toTitleCase = (str: string, isUpperCase?: boolean) => {
  return str.replace(/\w\S*/g, function (txt) {
    if (isUpperCase) {
      return txt.toUpperCase();
    }
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
export const COMMON_MESSAGES = {

  ACCESS: (action: 'restricted' | 'restored') => `Access to all associated data will be ${action}. Do you want to proceed?`,
  CATEGORY_ACTIVATE_DEACTIVATE: (action: 'activate' | 'deactivate' | 'delete', category : string) => ` Are you sure you want to ${action} ${category} Category?`,
  SUB_CATEGORY_ACTIVATE_DEACTIVATE: (action: 'activate' | 'deactivate' | 'delete', category : string) => ` Are you sure you want to ${action} ${category} Sub Category?`,

  ADDED: (type: string, isUpperCase?: boolean) =>
    toTitleCase(type, isUpperCase) + ' has been added successfully',
  UPDATED: (type: string, isUpperCase?: boolean) =>
    toTitleCase(type, isUpperCase) + ' has been updated successfully',
  RESET: (type: string, isUpperCase?: boolean) =>
    toTitleCase(type, isUpperCase) + ' has been reset successfully',
  BLOCKED: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to deactivate this ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been deactivated successfully`,
  },

  ACTIVE: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to activate this ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been activated successfully`,
  },
  INACTIVE: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to deactivate this ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been deactivated successfully`,
  },
  ACTIVATED: {
    title: (text: string) => `Activate ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module = 'customer'
    ) =>
      `Are you sure you want to ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  DEACTIVATED: {
    title: (text: string) => `Deactivate ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module = 'customer'
    ) =>
      `Are you sure you want to ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  LOGOUT: {
    title: (text: string) => `Delete ${text}`,
    confirm: (type: string, isUpperCase?: boolean, module = 'User') =>
      `Are you sure you want to ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  LOGOUT_ALL: {
    title: (text: string) => `Delete ${text}`,
    confirm: (type: string, isUpperCase?: boolean, module = 'User') =>
      `Are you sure you want to ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  DELETED: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to delete this ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been deleted successfully`,
  },

  DELETED_CONFIRMATION: {
    title: (text: string) => `Delete ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module = 'customer'
    ) =>
      `Are you sure you want to ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    finalConfirmation: `After confirming, the entire country's data will be lost.`,

    deleteConfirm: (
      module:string
    ) => `There are few items linked to ${module}. Do you wish to continue?"`,

    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  VERIFY: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to verify this ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been verified successfully`,
  },

  CANCEL: {
    heading: 'Confirmation?',
    text: 'If you cancel, the changes you made are lost.Click on save option to make changes.',
  },

  UPDATE: {
    heading: (key: string) => `${key} Update`,
  },

  DATE_FILTER_DISCLAIMER:
    'The 7-day data will be displayed by default. To view more data, use the date filter.',

  DELETE_NOTIFICATION: {
    title: 'Delete Notification',
  },

  DELETE_NOTIFICATION_TEXT: {
    title: 'Are you sure you want to delete notification?',
  },

  // DEACTIVATED_NOTIFICATION: {
  //   title: (text: string) => `Delete ${text}`,
  //   confirm: (
  //     type: string,
  //     isUpperCase?: boolean,
  //     module = 'customer',
  //     thisText = 'this'
  //   ) => `Are you sure you want to Delete Notification`,
  //   success: (type: string, isUpperCase?: boolean) =>
  //     `Notification has been successfully Delte`,
  // },

  DELETE_VIDEO: {
    title: 'Delete Video',
  },

  DELETE_VIDEO_TXT: {
    title: 'Are you sure you want to delete Video?',
  },

  PUBLISH: {
    title: (text: string) => `Publish ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module = 'customer'
    ) =>
      `Are you sure you want to ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  UNPUBLISH: {
    title: (text: string) => `Unpublish ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module = 'customer'
    ) =>
      `Are you sure you want to ${
        isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  DELETE_CATEGORY: {
    title: 'Delete Category',
    heading : 'Are you sure you want to delete Vitamins & Supplements category?'
  },

  DELETE_CATEGORY_TEXT: {
    title: 'Are you sure you want to delete category?',
  },

  DELETE_FAQ: {
    title: 'Delete FAQ',
  },

  DELETE_FAQ_TEXT: {
    title: 'Are you sure you want to FAQ?',
  },
  DELETE_SEASON: {
    title: 'Delete Season',
  },
  DELETE_SEASON_TEXT: {
    title: 'Are you sure you want to delete season?',
  },
  DELETE_EPISODE: {
    title: 'Delete Episode',
  },
  DELETE_EPISODE_TEXT: {
    title: 'Are you sure you want to delete episode?',
  },

  DELETE_GENRE: {
    title: 'Delete Genre',
  },

  DELETE_GENRE_TEXT: {
    title: 'Are you sure you want to delete genre?',
  },

  DELETE_USER_TEXT: {
    title: 'Are you sure you want to delete this user?',
  },

  UPLOAD_IMAGE_TO_ALL_TEXT: {
    heading : "Confirmation?",
    title: 'Once an image is uploaded to the web platform, it will automatically be applied across all platforms.',
  },

  BULK_UPLOAD_CONCERN: {
    title: 'Bulk Upload Concerns',
  },

  BULK_UPLOAD_BRAND: {
    title: 'Bulk Upload Brand',
  },

  BULK_UPLOAD_COLLECTION: {
    title: 'Bulk Upload Collection',
  },

  // NEW CONSTANT
  DELETE_ROLE : {
    title:'Delete Role',
    heading : 'Are you sure you want to delete this role?'
  },
  DELETE_USER : {
    title:'Delete User',
    heading : 'Are you sure you want to delete this user?'
  },

  DELETE_CUSTOMER : {
    title:'Delete Customer',
    heading : 'Are you sure you want to delete this customer?'
  },

  DELETE_ITEM : {
    title:'Delete Item',
    heading : 'Are you sure you want to delete this item?'
  },

  DELETE_SUPPLIER : {
    title:'Delete Supplier',
    heading : 'Are you sure you want to delete this supplier?'
  },

  RESEND_EMAIL : {
    title:'Resend Email',
    heading : 'Are you sure you want to resend invite to this user?'
  },

  DELETE_SUB_CATEGORY: {
    title: 'Delete Sub-category',
    heading : 'Are you sure you want to delete Vitamins & Supplements sub-category?'
  },

  COMMON_CONFIRMATION: {
    title: (text: string) => `${text}`,
    confirm: (
      text: string,
    ) =>
      `Are you sure you want to ${text}?`,
  },

  CHANGE_FIRST_TIME_LOGIN_PASSWORD: {
    title:'Change Your Default Password'
  },

  CATEGORY_IMPORT: `Your category data import is in progress. Once completed, a detailed report will be sent to your email.`,
  IMPORT_SUB_CATEGORY: `Your sub-category data import is in progress. Once completed, a detailed report will be sent to your email.`,
  IMPORT_TAGS: `Your tags data import is in progress. Once completed, a detailed report will be sent to your email.`,
  IMPORT_BRANDS: `Your brands data import is in progress. Once completed, a detailed report will be sent to your email.`,

  IMPORT_SUCCESS: (type: string) =>
    `Your ${type} data import is in progress. Once completed, a detailed report will be sent to your email.`, 
};