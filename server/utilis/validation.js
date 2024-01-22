const Joi = require('joi');

const authValidation = Joi.object({

  email: Joi.string()
    .required()
    .messages({
      'any.required': 'Email is required', 
      'string.empty': 'Email cannot be empty'  
    }) 
    .regex(/[A-Z0-9._%+-]+@gmail\.com$/i)
    .messages({
      'string.pattern.base': 'A Valid Email is required'  
    }),

  password: Joi.string()
    .messages({'string.base':"Password must be string"})
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty'
     })
    .min(3)
    .max(72)
    .messages({
      'string.min': 'Password must be at least {#limit} characters',
      'string.max': 'Password cannot exceed {#limit} characters',
    })
    .regex(/^[\w\@\-]+$/)
    .messages({
      'string.pattern.base': 'Password must contain only letters, numbers, @, - or _'
    })

});


const productValidation = Joi.object({

  name: Joi.string()
    .required()
    .messages({
      'any.required': 'Product name is required', 
      'string.empty': 'Product name cannot be empty'  
    }) 
    .regex(/^[a-zA-Z !@#$%^&*()_+=\[\]{};':",.\/\|-]+(\s[a-zA-Z !@#$%^&*()_+=\[\]{};':",.\/\|-]+)*\s*$/)
    .messages({
      'string.pattern.base': 'Product name must be a string'  
    }),

    brand: Joi.string()
    .required()
    .regex(/^[a-zA-Z !@#$%^&*()_+=\[\]{};':",.\/\|-]+(\s[a-zA-Z !@#$%^&*()_+=\[\]{};':",.\/\|-]+)*\s*$/)
    .messages({
      'string.pattern.base': 'Brand name must be a string',
      'any.required': 'Brand name is required', 
      'string.empty': 'Brand name cannot be empty'    
    }),

    category: Joi.string()
    .required()
    .regex(/^\s*([a-zA-Z]+(\s+[a-zA-Z]+)*)?\s*$/)
    .messages({
      'string.pattern.base': 'Category name must be a string' ,
      'any.required': 'Category name is required', 
      'string.empty': 'Category name cannot be empty'   
    }),

    subCategory: Joi.string()
    .required()
    .regex(/^\s*([a-zA-Z]+(\s+[a-zA-Z]+)*)?\s*$/)
    .messages({
      'string.pattern.base': 'Sub Category name must be a string' ,
      'any.required': 'Sub Category name is required', 
      'string.empty': 'Sub Category name cannot be empty'  
    }),
    
    size: Joi.string()
    .required()
    .regex(/^\s*([a-zA-Z]+(\s+[a-zA-Z]+)*)?\s*$/)
    .messages({
      'string.pattern.base': 'Product Size must be a string' ,
      'any.required': 'Product Size is required', 
      'string.empty': 'Product Size can not be empty'  
    }) , 
    

    discription: Joi.string()
    .required()
    .messages({
      'any.required': 'Discription  is required', 
      'string.empty': 'Discription cannot be empty'  
    }),

    returnPolicy: Joi.number()
    .required()    
    .min(1)
    .max(30)
    .messages({
      'any.required': 'Return Policy is required', 
      'number.empty': 'Return Policy cannot be empty' ,
      'number.min':'Return Policy must be more than 1 day',
      'number.max':"Return Policy is not allowed more than 30 days"  
    }),

    warranty: Joi.number()
    .required()    
    .min(1)
    .max(60)
    .messages({
      'any.required': 'Warranty is required', 
      'number.empty': 'Warranty cannot be empty' ,
      'number.min':'Warranty must be more than 1 Month',
      'number.max':"Warranty is not allowed more than 60 Months"  
    }),

    discount: Joi.number()
    .required()    
    .min(10)
    .max(80)
    .messages({
      'any.required': 'Discount is required', 
      'number.empty': 'Discount cannot be empty' ,
      'number.min':'Discount must be more than 10% or equal',
      'number.max':"Discount is not allowed more than 80% "  
    }),

    quantity: Joi.number()
    .required()    
    .min(1)
    .max(100)
    .messages({
      'any.required': 'Quantity is required', 
      'number.empty': 'Quantity cannot be empty' ,
      'number.min':'Quantity must be more than 1 or equal',
      'number.max':"Quantity is not allowed more than  100 "  
    }),

    paymentMethod: Joi.string()
    .required() 
    .regex(/^(online|offline)$/)
    .messages({
      'string.pattern.base': 'Payment method should be online or offline',  
      'any.required': 'Payment method is required', 
      'string.empty': 'Payment method cannot be empty' 
    }),

    price: Joi.number()
    .required()    
    .min(100)
    .max(50000)
    .messages({
      'any.required': 'Price is required', 
      'number.empty': 'Price cannot be empty' ,
      'number.min':'Price must be more than 100 or equal',
      'number.max':"Price is not allowed more than  50000 "  
    }),

    

});


const fileValidation = Joi.object({
    size: Joi.number()
      .max(1024 * 1024)
      .required()
      .messages({
        'number.max': 'File size must be at most 1MB',
        'any.required': 'File is required',
      }),

    originalname: Joi.string()
      .regex(/\.(jpg|jpeg|png|webp)$/)
      .required()
      .messages({
        'string.pattern.base': 'File must have a valid extension (jpg, jpeg, or png)',
        'any.required': 'File is required',
      }),

    mimetype: Joi.string()
      .valid('image/jpeg', 'image/jpg', 'image/png', 'image/webp')
      .required()
      .messages({
        'any.only': 'File must have a valid image MIME type (jpeg, jpg, or png)',
        'any.required': 'File is required',
      }),
  })


  const orderValidation = Joi.object({
    userId: Joi.string()
    .required()
    .messages({
      'any.required': 'Product name is required', 
      'string.empty': 'Product name cannot be empty'  
    }),   
    
    userOrderList:Joi.array().items(
      Joi.object({
        product: Joi.string()
        .required()
        .messages({
          'any.required': 'Product Id is required', 
          'string.empty': 'Product Id cannot be empty'  
        }), 

        quantity: Joi.number()
        .required()    
        .min(1)
        .max(100)
        .messages({
          'any.required': 'Quantity is required', 
          'number.empty': 'Quantity cannot be empty' ,
          'number.min':'Quantity must be more than 1 or equal',
          'number.max':"Quantity is not allowed more than  100 "  
        }),

        paymentStatus: Joi.string()
        .required() 
        .regex(/^(pending|successfully)$/)
        .messages({
          'string.pattern.base': 'Payment status should be pending or succeessfully',  
          'any.required': 'Payment Status is required', 
          'string.empty': 'Payment Status  cannot be empty' 
        }),
        orderStatus: Joi.string()
        .required() 
        .regex(/^(pending)$/)
        .messages({
          'string.pattern.base': 'Order status should be pending',  
          'any.required': 'Order Status is required', 
          'string.empty': 'Order Status  cannot be empty' 
        }),
        deliveryAddress: Joi.object({
          houseNo: Joi.string()
          .required()    
          .min(1)
          .max(1000)
          .pattern(/^[0-9]+$/)
          .messages({
            'any.required': 'House No is required', 
            'string.empty': 'House No  cannot be empty' ,
            'string.min':' House No  must be more than 1',
            'string.max':" House No  is not allowed more than 1000 "  ,
            'string.pattern.base':" House No  must be a number "  
          }),
          location: Joi.string()
          .required()
          .regex(/^\s*([a-zA-Z]+(\s+[a-zA-Z]+)*)?\s*$/)
          .messages({
            'any.required': 'Location is required', 
            'string.empty': 'Location cannot be empty', 
            'string.pattern.base': 'Product name must be a string'
          }) ,
          city: Joi.string()
          .required()
          .regex(/^\s*([a-zA-Z]+(\s+[a-zA-Z]+)*)?\s*$/)
          .messages({
            'any.required': 'City Name is required', 
            'string.empty': 'City Name be empty', 
            'string.pattern.base': 'City Name must be a string'
          }) ,
          state: Joi.string()
          .required()
          .regex(/^\s*([a-zA-Z]+(\s+[a-zA-Z]+)*)?\s*$/)
          .messages({
            'any.required': 'State Name is required', 
            'string.empty': 'State Name be empty', 
            'string.pattern.base': 'State Name must be a string'
          }) ,
          pinCode: Joi.string()
          .min(6)
          .max(6)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({
              'any.required': 'Pin Code is required',
              'string.empty': 'Pin Code cannot be empty',
              'string.min': 'Pin Code must be exactly 6 digits',
              'string.max': 'Pin Code must be exactly 6 digits',
              'string.pattern.base': 'Pin Code must contain only numeric characters'
          }),
      
        })

      })
      
    )
    .min(1)
      .messages({
        'array.min': 'At least one order must be present',
      }),


  })

module.exports = {authValidation ,productValidation , fileValidation , orderValidation};