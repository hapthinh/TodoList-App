import { SignInPage } from '@toolpad/core';
import signInAction from 'app/actions/signInActions';
import { providerMap } from 'auth';

export default function SignIn() {
    return (
        <SignInPage
            providers={providerMap}
            signIn={signInAction}
        >
        </SignInPage>
    )
}
