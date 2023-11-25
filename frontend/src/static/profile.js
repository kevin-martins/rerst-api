export const profileFormData = [
    {
      id: "first_name",
      name: 'Prenom',
      type: "text",
      options: {
        required: 'Veuillez préciser votre prenom'
      }
    },
    {
      id: "last_name",
      name: 'Nom',
      type: "text",
      options: {
        required: 'Veuillez préciser votre nom'
      }
    },
    {
      id: "phone_number",
      name: 'Numéro de téléphone',
      type: "text",
      options: {
        required: 'Veuillez préciser votre numéro de téléphone'
      }
    },
    {
      id: "age",
      name: 'Age',
      type: "text",
      options: {
        required: 'Veuillez préciser votre age',
        min: {
          value: 18,
          message: 'Vous devez avoir au minimum 18 ans'
        },
        max: {
          value: 150,
          message: 'Vous ne pouvez pas avoir plus de 150 ans'
        }
      }
    },
    {
      id: "address",
      name: 'Adresse',
      type: "text",
    }
  ]