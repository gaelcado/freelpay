**Key Principles:**

*   **Incremental Progress:** We'll tackle this step-by-step, focusing on one feature/API endpoint at a time.  This minimizes the risk of getting overwhelmed.
*   **Test-Driven (Ideally):**  While you didn't provide tests, I *strongly* recommend adding them as you go.  Even simple tests will save you hours of debugging.
*   **Version Control:** Use `git` *religiously*.  Commit after *every* small, working change. This makes it easy to revert if something goes wrong.
*   **AI Assistance:**  Leverage your AI coding agent!  Paste in code snippets, ask it to explain things, generate tests, or refactor code.  Don't just blindly copy-paste; try to understand what it's doing.
*   **Consistent Naming:**  We'll strive for consistent naming conventions across the frontend and backend (e.g., using `camelCase` for JavaScript and `snake_case` for Python).

**Progression de la migration :**

- [x] **Configuration initiale :** Backend ajouté au projet
- [x] **Phase 1 (Authentification) - En cours :**
  - [x] Création du client Supabase
  - [x] Création des fonctions d'API d'authentification
  - [x] Création du contexte d'authentification
  - [x] Création du composant RouteGuard
  - [x] Mise à jour du formulaire de connexion/inscription
  - [x] Intégration du composant hCaptcha
  - [ ] Tests de l'authentification
- [ ] **Phase 2 (Profil utilisateur)**
- [ ] **Phase 3 (Liste des factures)**
- [ ] **Phase 4 (Création de facture manuelle)**
- [ ] **Phase 5 (Upload de facture OCR)**
- [ ] **Phase 6 (Scoring)**
- [ ] **Phase 7 (Signature)**
- [ ] **Phase 8 (Financement)**
- [ ] **Phase 9 (Autres fonctionnalités)**

**Project Setup (One-Time):**

1.  **Combine Projects:**
    *   Create a new folder for the combined project: `freelpay-combined`.
    *   Copy the contents of `gaelcado-freelpay` (the new frontend) into `freelpay-combined`.
    *   Copy the `backend` directory from `gaelcado-freelpay-old` into `freelpay-combined`.  Your structure should now look like this:

    ```
    freelpay-combined/
    ├── backend/          (from gaelcado-freelpay-old)
    │   ├── ...           (all the FastAPI backend files)
    ├── src/              (from gaelcado-freelpay)
    │   ├── app/
    │   ├── components/
    │   ├── ...
    ├── package.json     (from gaelcado-freelpay)
    ├── ...              (other frontend files)
    ```
2. Rename the package.json file
3. Merge Dependencies:
Open the `package.json` file in `freelpay-combined`.
Open the `package.json` file in `gaelcado-freelpay-old/frontend`.
Carefully merge the dependencies. In particular:
    *Dependencies*: Copy *any* missing dependencies from the old `frontend/package.json`'s `dependencies` section into the `dependencies` section of the new `package.json`. If a dependency exists in both, use the *newer* version (from the new project if possible, but be careful of major version differences – e.g., `pydantic` v1 vs. v2).
    *DevDependencies*: Do the same for `devDependencies`.
    *Backend Dependencies*: Since your backend is now in the root, you need to make sure your backend requirements are installed. The easiest way is, inside `freelpay-combined/backend`, run pip install -r requirements.txt.  Better, but slightly more complex, is to use a tool like `poetry` to manage your backend dependencies in a `pyproject.toml` file, keeping them separate from your frontend dependencies.  This is recommended for larger projects. For now, `pip` will work.

4.  **Initial Run & Test:**
    *   In the `freelpay-combined` directory, run `npm install` (or `yarn` or `pnpm install`) to install the *frontend* dependencies.
    *   In the `freelpay-combined/backend` directory, run `pip install -r requirements.txt` (or use `poetry` if you prefer).
    *   Start the backend: `cd backend` and then `uvicorn main:app --reload`.
    *   In a *separate* terminal, start the frontend: `cd ../` (to go back to the root) and then `npm run dev`.
    *   Open your browser to `http://localhost:3000`. You should see the new frontend (though most features won't work yet).

5.  **Environment Variables:**
    *   Create a `.env` file in the root of `freelpay-combined`.
    *   Copy *all* environment variables from `gaelcado-freelpay-old/backend/.env` and `gaelcado-freelpay-old/frontend/.env` into this single `.env` file.  Make sure to set the values appropriately for your local development environment (database URLs, API keys, etc.).  *Do not* commit this `.env` file.
    *   The `NEXT_PUBLIC_API_URL` should likely be `http://localhost:8000/api`.
    *   Update `next.config.ts` to remove `output: 'standalone'`.  We'll handle running the backend separately.  Make sure the `env` section correctly reads the environment variables from the `.env` file.

**Migration Roadmap (Phases):**

We'll focus on getting the core authentication and then invoice creation/listing working first. Then, we'll progressively add more features.

**Phase 1: Authentication (Signup/Login)**

1.  **Backend (Auth Routes):**
    *   We already have the `/auth/signup` route in `backend/routers/auth.py`.  This route is responsible for creating users in the Supabase Auth system *and* creating a corresponding record in the `users` table.  This is a good design.  The new frontend's signup form needs to call this endpoint.
    *   The `get_current_user` dependency in `backend/dependencies.py` is also crucial. This function verifies the JWT token sent from the frontend and extracts user information.  This function should *not* be changed significantly.
    *   You don't have a dedicated login route (email + password) in the old backend, because Supabase handles it.  You'll use `supabase.auth.signInWithPassword` on the frontend.

2.  **Frontend (Authentication Logic):**
    *   **`src/app/api/auth.ts`:**  Review this file. You'll need to adapt the `signUpWithEmail` function to send the correct data to the `/auth/signup` backend endpoint.  The `signInWithEmail` function looks good.  The `requestPasswordReset` and `updatePassword` functions likely need no changes.

        *   **Key Changes:**
            *   `signUpWithEmail`: Make sure it sends *all* the required user fields (`username`, `email`, `siren_number`, `phone`, `address`) to the backend, as defined in the `UserCreate` model.  This function should now *also* take a `captchaToken` as an argument and pass it to the backend.
            *    Make sure that after a successful user signup, you also log the user in. This step seems to be missing.

    *   **`src/components/login-form.tsx`:**  This component needs to be updated to use the `signInWithEmail` and `signUpWithEmail` functions from `src/app/api/auth.ts`.  The `handleSubmit` function needs to:
        *   Handle both login and signup.
        *   Call the appropriate API function (either `signInWithEmail` or `signUpWithEmail`).
        *   Store the returned session data (JWT token) in local storage (like you are already doing).
        *   Set the `isAuthenticated` state using the `useAuth` hook (which you are already doing correctly).
        *   Redirect the user to the dashboard on successful login/signup.
        *   Handle errors (e.g., display error messages to the user).
        *    Add the hCaptcha to the signup form, and get the token.

    *   **`src/components/AuthContext.tsx`:**  This file looks good and should not need significant changes.  It manages the `isAuthenticated` state and provides it to the rest of the application.

    *   **`src/components/RouteGuard.tsx`:**  This component *should* redirect unauthenticated users to the login page. Currently, it just returns `null`. Change it to redirect:

        ```typescript
        import { useRouter } from 'next/navigation';
        import { useAuth } from './AuthContext';
        import { useEffect } from 'react';

        export function RouteGuard({ children }: { children: React.ReactNode }) {
          const { isAuthenticated } = useAuth();
          const router = useRouter();

          useEffect(() => {
            if (!isAuthenticated) {
              router.replace('/login'); // Redirect to the login page
            }
          }, [isAuthenticated, router]);

          return isAuthenticated ? <>{children}</> : null;
        }
        ```
3.  **Testing:**
    *   Thoroughly test both signup and login functionality.
    *   Test with valid and invalid credentials.
    *   Test with a missing or invalid CAPTCHA token.
    *   Inspect the network requests in your browser's developer tools to make sure the correct data is being sent to the backend.
    *   Check that the Supabase Auth system and the `users` table are being updated correctly.

**Phase 2: User Profile (Retrieval and Update)**

1.  **Backend (User Routes):**
    *   `backend/routers/user.py`:  You have the necessary routes here:
        *   `/me`:  Retrieves the current user's profile.
        *   `/update`: Updates the user's profile.
        *   `/upload-id`: Handles ID document uploads.
    *   Make sure the `update_user_profile_route` function only updates the fields that are provided in the request body (it looks like you are already doing this correctly using `model_dump(exclude_unset=True)`).
    *   Add error handling for the case where a user tries to update a field that is not allowed (e.g., changing their username after initial signup).

2.  **Frontend (Profile Page):**
    *   **`src/app/profile/page.tsx`:**  This component is the profile page.
        *   `fetchUserProfile`: This function should call the `/users/me` endpoint to get the user's data.  It looks like you are already doing this correctly.
        *   `handleInputChange`:  This function should update the local state when an input field changes. You are already doing this.
        *   `handleSubmit`: This function should call the `/users/update` endpoint to update the user's profile.  It needs to send only the fields that have changed.
        *   `handleFileUpload`: This function should call the `/users/upload-id` endpoint to upload the ID document. The current code uses `aiofiles`. Make sure this is properly set up for file uploads in a Next.js environment. You may need to use a different approach for handling file uploads on the frontend (Next.js API routes might be needed for handling file uploads on the server-side).

3.  **Testing:**
    *   Test fetching the user profile.
    *   Test updating different fields of the user profile.
    *   Test uploading a valid ID document.
    *   Test uploading an invalid ID document.
    *   Test updating the profile with missing or invalid data.
    * Test updating fields that aren't allowed to change.

**Phase 3: Invoice Listing (Dashboard)**

1.  **Backend (Invoice Routes):**
    *   `backend/routers/invoice.py`: You have the `/list` route to retrieve the user's invoices.  This route is already implemented and uses the `get_user_invoices` function from `backend/database/db.py`.  Ensure this function correctly retrieves invoices associated with the currently logged-in user.
    *   You should use `get_current_user` instead of `get_optional_user` in the `/calculate-score` endpoint.

2.  **Frontend (Dashboard Page):**
    *   **`src/app/dashboard/page.tsx`:** This component displays the list of invoices.
        *   `fetchInvoices`: This function should call the `/invoices/list` endpoint to get the user's invoices.  It's already implemented and seems correct.
        *   The `Table` component should display the invoice data correctly.
        *   You have `handleSend` and `handleView` functions. These will be connected to the corresponding buttons later.

3.  **Testing:**
    *   Test fetching invoices for a logged-in user.
    *   Test with different numbers of invoices (including zero).
    *   Test the filtering and sorting logic.

**Phase 4: Invoice Creation (Manual)**

1.  **Backend (Invoice Routes):**
    *   `backend/routers/invoice.py`: You have the `/create` route for manual invoice creation.
    *   You have `backend/routers/invoice_onboarding.py`, which appears to be related to creating invoices without authentication. We'll need to decide how this fits in, or if it should be removed. I recommend, for the first version, to focus on the authenticated flow (`/invoices/create`).
    *   The `create_invoice_route` function uses the `InvoiceCreate` Pydantic model for validation and then creates an `InvoiceInDB` instance before saving it. This is good.

2.  **Frontend (New Invoice Page):**
    *   **`src/app/new-invoice/page.tsx`:** This component is the form for creating a new invoice.
        *   You'll need to decide whether to keep the two tabs ("Manual" and "Upload") or focus on manual creation first.
        *   The form fields should be bound to the `useState` variables.
        *   The `handleSubmit` function should call the `/invoices/create` endpoint with the invoice data.
        *   You will likely want to integrate this page with the SIREN validation API.

3.  **Testing:**
    *   Test creating invoices with valid and invalid data.
    *   Test that the invoices are correctly created in the database.

**Phase 5: Invoice Upload (OCR)**

1.  **Backend (OCR and Invoice Routes):**
    *   `backend/routers/invoice.py`: You have the `/upload` route, which is the correct endpoint for authenticated users.
    *   `backend/routers/invoice_onboarding.py`: You have `/onboarding/upload`, which is for unauthenticated users. Decide which approach you want to use, or if you want to support both.
    *   `backend/services/ocr_service.py`:  This file handles the OCR processing.  It uses `pytesseract` and OpenAI's `gpt-4o-mini` model.  This is a good setup.
    *  Make sure you verify that your chosen OpenAI model is correctly configured and works.

2.  **Frontend (New Invoice Page - Upload Tab):**
    *   **`src/app/new-invoice/page.tsx`:**  You have the `handleFileUpload` function.
        *   This function should send the uploaded file to the `/invoices/upload` endpoint (if requiring authentication) or `/invoices/onboarding/upload` (if allowing unauthenticated uploads).
        *   You need to handle the response from the backend, which will contain the extracted invoice data (or an error).
        *   You should provide a way for the user to *review and correct* the extracted data before the invoice is finalized.  This is *critical* because OCR is never perfect.

3.  **Testing:**
    *   Test uploading various types of PDF invoices.
    *   Test with images (if supported).
    *   Test with invalid file types.
    *   Test the error handling for OCR failures.
    *   Test the OCR extraction accuracy and the review/correction process.

**Phase 6: Scoring (Pennylane Integration)**

1.  **Backend (Invoice Routes & Pennylane Service):**
    *   `backend/routers/invoice.py`: You have the `/calculate-score` and `/{invoice_id}/create-pennylane-estimate` routes.
    *   `backend/services/pennylane.py`: This file contains the logic for interacting with the Pennylane API.
        *   `create_pennylane_estimate`: This function creates an estimate in Pennylane based on the invoice data. Make sure it handles all required fields and error conditions.
        *   `send_estimate_for_signature`:  This function is not used in the current flow, but is related to PandaDoc.
        * You also have a `get_invoice_pdf_url` function. It should be called before `send_document_for_signature` in `pandadoc.py`.
    *   `backend/services/scoring_service.py`:  This file contains the `calculate_score` function, which uses OpenAI to calculate a risk score.  Make sure this is correctly integrated with the `/calculate-score` route.

2.  **Frontend (Invoice Creation/Display):**
    *   After creating an invoice (either manually or via OCR), you should call the `/calculate-score` endpoint to get the initial score.
    *   You need UI elements to display the score and possible financing amount.
    *   There should be a button to trigger the Pennylane estimate creation (`/{invoice_id}/create-pennylane-estimate`).
    * The `handleScoreInvoice` function in the create invoice page does this.

3.  **Testing:**
    *   Test the score calculation with different invoice data.
    *   Test the Pennylane estimate creation.
    *   Verify that the `pennylane_id` is correctly stored in the invoice record.

**Phase 7: Sending for Signature (PandaDoc Integration)**

1.  **Backend (Invoice Routes & PandaDoc Service):**
    *   `backend/routers/invoice.py`: You have the `/{invoice_id}/send` route, which is intended to send the invoice for signature.
    *   `backend/services/pandadoc.py`: This file contains the logic for interacting with the PandaDoc API.
        *   `send_document_for_signature`: This function takes a file URL (from Pennylane), recipient email, and name, creates a PandaDoc document, and sends it for signature.
        *   `setup_pandadoc_webhook`:  This sets up the webhook for receiving notifications from PandaDoc.  In a production environment, this would usually be configured through the PandaDoc dashboard, not in the application code.
    *   `backend/routers/webhook.py`: This file contains the `/pandadoc` route, which receives webhook notifications from PandaDoc. This updates the invoice status in the database. *This is a critical part of the flow and must be secured.*
    *   *Important:* The `send_document_for_signature` function has a hardcoded signature field with fixed coordinates (`x`, `y`, `width`, `height`, `page_number`).  You *must* make this dynamic.  PandaDoc has a feature called "templates" that is designed for this.  You'll need to create a PandaDoc template with fields for the signature, date, and any other information you want to include.  Then, your code will use the template ID and fill in the fields with the appropriate values. The coordinates are part of the template creation.

2.  **Frontend (Invoice Display):**
    *   After the Pennylane estimate is created, you should show a "Send for Signature" button.
    *   This button should trigger the `/{invoice_id}/send` endpoint.
    *   The UI should reflect the status of the invoice (e.g., "Sent for Signature," "Signed").

3.  **Testing:**
    *   Test sending invoices for signature.
    *   Test the webhook functionality (you'll likely need to use a tool like ngrok to expose your local server to the internet for testing webhooks).
    *   Verify that the invoice status is updated correctly in the database when the document is signed.
    *   Test error handling (e.g., invalid recipient email).

**Phase 8: Financing (Defacto Integration) - (FUTURE)**

This phase is more complex and depends on the specifics of Defacto's API.  You would:

1.  Create a `defacto.py` service file similar to `pennylane.py` and `pandadoc.py`.
2.  Implement functions to interact with the Defacto API:
    *   Submitting a financing request.
    *   Checking the status of a request.
    *   Handling webhooks from Defacto.
3.  Add routes to your FastAPI backend to handle these interactions.
4.  Update the frontend to display the financing status and options.

**Phase 9: Other Features and Refinements**

*   **User Profile:**
    *   Implement the ability for users to update their profile information.
    *   Add proper validation to the profile update form.
*   **Client Management:** Implement the `src/app/dashboard/clients/page.tsx` to list, add, and edit client information.
*   **Payment Integration (Stripe/PayPal):**  This is a major feature. You'll need to:
    *   Choose a payment gateway.
    *   Integrate their SDK or API (both frontend and backend).
    *   Handle payment processing securely.
    *   Handle webhooks for payment events (success, failure, etc.).
*   **Notifications:** Implement a notification system (using websockets or polling) to inform users of important events (e.g., invoice signed, payment received).
*   **Error Handling:** Improve error handling throughout the application, providing informative error messages to the user.
*   **Testing:** Add comprehensive unit and integration tests.
*   **Security:** Review all security aspects (authentication, authorization, input validation, data protection).
*   **Deployment:** Deploy the application to DigitalOcean (or your chosen platform) using the `app.yaml` configuration.
*   **Logging:** Refine logging to be more informative in production.
* **Mobile friendly**: Make sure the application is responsive (check all views).

**Detailed Steps for Phase 1 (Authentication) - Practical Example**

Let's walk through the concrete steps to connect the frontend signup form with the backend `/auth/signup` endpoint.

1.  **Review `backend/routers/auth.py`:** You already have this route, and it looks good.  It takes a `UserCreate` model as input.

2.  **Review `backend/models/user.py`:**  The `UserCreate` model defines the required fields: `id`, `username`, `email`, `siren_number`, `phone`, `address`. Make sure these fields align with your form.

3.  **Update `frontend/app/api/auth.ts`:**

    ```typescript
    // frontend/app/api/auth.ts
    import { supabase } from '@/lib/supabase';
    import { UserCreate } from '../../../backend/models/user'; // Import the UserCreate model!

    export const signUpWithEmail = async (user: UserCreate, captchaToken: string) => { // Add captchaToken
      console.log('Starting signup process...');
      try {
        const { data, error: authError } = await supabase.auth.signUp({
          email: user.email,
          password: user.password!, // Add a "!" to assert that password exists, as you'll require it in the form.
          options: {
            data: {
              username: user.username,
              siren_number: user.siren_number,
              phone: user.phone,
              address: user.address,
              registration_incomplete: true,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            captchaToken: captchaToken, // Pass the captcha token
          },
        });

        if (authError) {
          if (authError.message.includes('User already registered')) {
            throw new Error('Un compte existe déjà avec cette adresse email. Veuillez vous connecter.');
          }
          throw authError;
        }

        // Sign in the user immediately after signup
        if (data.user && data.session) {
          return { session: data.session, user: data.user };
        } else {
          //This should not happen, but handle it gracefully
            throw new Error("Erreur d'authentification, aucun utilisateur retourné.");
        }

        return data;
      } catch (error) {
        console.error('Signup error:', error);
        throw error;
      }
    };
    // ... rest of your auth.ts file
    ```

4.  **Update `frontend/app/page.tsx` (Home/Signup Form):**

    ```typescript
      // In the handleSubmit function, for the signup case:
      } else { // This is the signup case
          if (!captchaToken) {
            toast({
              title: t('common.error'),
              description: t('auth.completeCaptcha'),
              variant: 'destructive',
            });
            return;
          }
          //Format UserCreate correctly
          const user : UserCreate = {
            id: crypto.randomUUID(), //You need an UUID for the ID
            username: username,
            email: email,
            password: password, // Add password
            siren_number: sirenNumber,
            phone: phone,
            address: address,
          }
          
          try {
            const { user : userSignedUp, session } = await signUpWithEmail(user, captchaToken); //Pass user object + token
            if (userSignedUp && session) {
              // ... (rest of your success handling: toast, setIsAuthenticated, router.push)
              if (captcha.current) {
                // @ts-ignore
                captcha.current.resetCaptcha()
              }
              setCaptchaToken('')
              toast({
                title: t('common.success'),
                description: t('auth.verifyEmail'),
              })

              localStorage.setItem('token', session.access_token);
              setIsAuthenticated(true);
              router.push('/dashboard'); // Redirect to the dashboard

            } else {
              toast({
                title: t('common.error'),
                description: t('auth.authenticationFailed'), // Or a more specific message
                variant: 'destructive',
              })
            }
          } catch (error: any) {
            // ... (your existing error handling)
            console.error("Signup error:", error);
            const message = error instanceof Error ? error.message : "Une erreur est survenue lors de l'authentification.";
            toast({
                title: "Erreur",
                description: message,
                variant: "destructive",
            });
          }
        }

    ```

5. **Update `frontend/components/ui/input.tsx`:**
Add `accept` and `multiple` to the props.

    ```tsx
        export interface InputProps
        extends React.InputHTMLAttributes<HTMLInputElement> {
          accept?: string;
          multiple?: boolean;
        }
    ```

6. **Update `frontend/app/page.tsx`**
You are using a component `<SignUpForm>` inside this page, you don't need it. You can implement all the logic inside a single component, for now it's better to keep it simple.

7.  **Testing:**
    *   Go to your signup form (`http://localhost:3000`).
    *   Fill out the form with valid data.
    *   Click "Sign Up".
    *   Verify that:
        *   A new user is created in your Supabase Auth "Users" section.
        *   A new record is created in your Supabase `users` table with the correct data.
        *   You are redirected to the dashboard.

**Important Considerations:**

*   **Error Handling:** The code above includes basic error handling, but you should expand on this.  Display user-friendly error messages for different types of errors (e.g., invalid email, weak password, network error, etc.).
*   **Form Validation:** Pydantic handles validation on the backend, which is great. You're also using `zod` for validation in the `FinancingStep` component, it's great ! Use the same pattern everywhere.
*   **Security:** Always handle sensitive data (passwords, API keys) securely. Never store passwords in plain text. Use HTTPS for all communication between the frontend and backend.

This detailed roadmap provides a structured approach to integrating the backend with the frontend, starting with the core authentication flow. By following these steps and testing thoroughly, you can build a solid foundation for your FreelPay application. Remember to use your AI coding assistant to help with code generation, explanations, and debugging, but always review and understand the code it produces. Good luck!
