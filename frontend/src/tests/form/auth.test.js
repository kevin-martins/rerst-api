import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Form from '../../components/Form';
import { logInFormData, signInFormData } from '../../static/auth';
import { faker } from '@faker-js/faker';
import { act } from 'react-dom/test-utils';

describe("Log In Form Test", () => {
  test("Display errors for required fields upon form submission", async () => {
    const { getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={logInFormData}
      />
    );
    const submitButton = getByText('Connexion');

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const phoneNumberError = getByText('Veuillez renseigner votre numéro de téléphone');
      const passwordError = getByText('Veuillez renseigner votre mot de passe');

      expect(phoneNumberError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  test("Display errors for invalid phone number upon form submission", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={logInFormData}
      />
    );
    const submitButton = getByText('Connexion');

    const phoneNumberInput = getByLabelText('Numéro de téléphone');
    const invalidPhoneNumber = [
      {
        value: faker.string.symbol(5),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: faker.person.firstName(),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: faker.phone.number(),
        error: "Le numéro de téléphone n'est pas valide"
      }
    ]

    for (const { value, error } of invalidPhoneNumber) {
      await act(async () => {
        await fireEvent.input(phoneNumberInput, { target: { value } });
        await fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  test("Don't display errors on valid phone number", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={logInFormData}
      />
    );
    const submitButton = getByText('Connexion');

    const phoneNumberInput = getByLabelText('Numéro de téléphone');
    const validPhoneNumber = [
      {
        value: "0" + faker.string.numeric({ length: 9 }),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: "+33" + faker.string.numeric({ length: 9 }),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: ("0" + faker.string.numeric({ length: 9 })).match(/.{2}/g).join(' '),
        error: "Le numéro de téléphone n'est pas valide"
      }
    ]

    for (const { value, error } of validPhoneNumber) {
      await act(async () => {
        await fireEvent.input(phoneNumberInput, { target: { value } });
        await fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(queryByText(error)).toBeNull();
      });
    }
  });
});

describe("Sign In Form Test", () => {
  test("Display errors for required fields upon form submission", async () => {
    const { getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const firstNameError = getByText('Veuillez renseigner votre prénom');
      const lastNameError = getByText('Veuillez renseigner votre nom');
      const phoneNumberError = getByText('Veuillez renseigner votre numéro de téléphone');
      const ageError = getByText('Veuillez renseigner votre âge');

      expect(firstNameError).toBeInTheDocument();
      expect(lastNameError).toBeInTheDocument();
      expect(phoneNumberError).toBeInTheDocument();
      expect(ageError).toBeInTheDocument();
    });
  });

  test("Display errors for invalid first name upon form submission", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const firstNameInput = getByLabelText('Prénom');

    const invalidFirstName = [
      {
        value: faker.string.binary({ length: 6 }),
        error: 'Le prénom doit être uniquement composé de lettres'
      },
      {
        value: faker.string.symbol(5),
        error: 'Le prénom doit être uniquement composé de lettres'
      }
    ]

    for (const { value, error } of invalidFirstName) {
      await act(async () => {
        await fireEvent.input(firstNameInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  test("Don't display errors on valid first name", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const firstNameInput = getByLabelText('Prénom');

    const validFirstName = [
      {
        value: faker.person.firstName(),
        error: 'Le prénom doit être uniquement composé de lettres'
      },
      {
        value: faker.string.alpha(10),
        error: 'Le prénom doit être uniquement composé de lettres'
      }
    ]

    for (const { value, error } of validFirstName) {
      await act(async () => {
        await fireEvent.input(firstNameInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(queryByText(error)).toBeNull();
      });
    }
  });

  test("Display errors for invalid last name upon form submission", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const lastNameInput = getByLabelText('Nom');
    const invalidLastName = [
      {
        value: faker.string.binary({ length: 6 }),
        error: 'Le nom doit être uniquement composé de lettres'
      },
      {
        value: faker.string.symbol(5),
        error: 'Le nom doit être uniquement composé de lettres'
      }
    ]

    for (const { value, error } of invalidLastName) {
      await act(async () => {
        await fireEvent.input(lastNameInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  test("Don't display errors on valid last name", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const lastNameInput = getByLabelText('Nom');
    const validLastName = [
      {
        value: faker.person.lastName(),
        error: 'Le nom doit être uniquement composé de lettres'
      },
      {
        value: faker.string.alpha(10),
        error: 'Le nom doit être uniquement composé de lettres'
      }
    ]

    for (const { value, error } of validLastName) {
      await act(async () => {
        await fireEvent.input(lastNameInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(queryByText(error)).toBeNull();
      });
    }
  });

  test("Display errors for invalid phone number upon form submission", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const phoneNumberInput = getByLabelText('Numéro de téléphone');

    const invalidPhoneNumber = [
      {
        value: faker.string.symbol(5),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: faker.person.firstName(),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: faker.phone.number(),
        error: "Le numéro de téléphone n'est pas valide"
      }
    ]

    for (const { value, error } of invalidPhoneNumber) {
      await act(async () => {
        await fireEvent.input(phoneNumberInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  test("Don't display errors on valid phone number", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");

    const phoneNumberInput = getByLabelText('Numéro de téléphone');
    const validPhoneNumber = [
      {
        value: "0" + faker.string.numeric({ length: 9 }),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: "+33" + faker.string.numeric({ length: 9 }),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: ("0" + faker.string.numeric({ length: 9 })).match(/.{2}/g).join(' '),
        error: "Le numéro de téléphone n'est pas valide"
      }
    ]

    for (const { value, error } of validPhoneNumber) {
      await act(async () => {
        await fireEvent.input(phoneNumberInput, { target: { value } });
        await fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(queryByText(error)).toBeNull();
      });
    }
  });

  test("Display errors for invalid age upon form submission", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");

    const ageInput = getByLabelText('Âge');
    const invalidAge = [
      {
        value: faker.number.int({ min: -10000, max: 17 }),
        error: 'Vous devez avoir au minimum 18 ans'
      },
      {
        value: faker.number.int({ min: 151, max: 10000 }),
        error: 'Vous ne pouvez pas avoir plus de 150 ans'
      },
      {
        value: faker.word.words(),
        error: "L'age n'est pas valide"
      },
    ]

    for (const { value, error } of invalidAge) {
      await act(async () => {
        await fireEvent.input(ageInput, { target: { value } });
        await fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  test("Don't display errors on valid age", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");

    const ageInput = getByLabelText('Âge');
    const validAge = {
      value: faker.number.int({ min: 18, max: 150 }),
      errors: [
        {
          message: 'Vous devez avoir au minimum 18 ans'
        },
        {
          message: 'Vous ne pouvez pas avoir plus de 150 ans'
        },
        {
          message: "L'age n'est pas valide"
        }
      ]
    }

    await act(async () => {
      await fireEvent.input(ageInput, { target: { value: validAge.value } });
      await fireEvent.click(submitButton);
    });
    
    for (const { message } of validAge.errors) {
      await waitFor(() => {
        expect(queryByText(message)).toBeNull();
      });
    }
  });
});