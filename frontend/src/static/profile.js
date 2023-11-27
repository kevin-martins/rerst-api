export const profileFormData = {
  submitText: "Envoyer",
  fields: [
    {
      id: "first_name",
      name: 'Prénom',
      type: "text",
      options: {
        required: 'Veuillez préciser votre prénom',
        pattern: {
          value: /^[a-zA-Z]+([ -][a-zA-Z]+)?$/g,
          message: "Le prénom doit être uniquement composé de lettres"
        }
      }
    },
    {
      id: "last_name",
      name: 'Nom',
      type: "text",
      options: {
        required: 'Veuillez préciser votre nom',
        pattern: {
          value: /^[a-zA-Z]+([ -][a-zA-Z]+)?$/g,
          message: "Le nom doit être uniquement composé de lettres"
        }
      }
    },
    {
      id: "phone_number",
      name: 'Numéro de téléphone',
      type: "tel",
      options: {
        required: 'Veuillez préciser votre numéro de téléphone',
        pattern: {
          value: /^(?:\+33\s?|0)[1-9]([.|\s|-]?\d{2}){4}$/g,
          message: "Le numéro de téléphone n'est pas valide"
        }
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
        },
        pattern: {
          value: /^[0-9]+$/g,
          message: "L'age n'est pas valide"
        }
      }
    },
    {
      id: "address",
      name: 'Adresse',
      type: "text",
    }
  ]
}