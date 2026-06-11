import { LoginForm } from "@/components/auth/LoginForm";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <>
      <PageHero title="Tu cuenta" subtitle="Accede con las credenciales del servidor" />
      <section className="px-4 pb-20">
        <LoginForm />
      </section>
    </>
  );
}
