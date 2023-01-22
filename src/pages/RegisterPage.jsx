import RegisterForm from "../components/RegisterForm";
import { handleRegister } from "../../api/firebase";
import { redirect, useActionData, useNavigation } from "react-router-dom";

function RegisterPage() {
  const data = useActionData();
  const navigation = useNavigation();

  return (
    <section>
      {data && (
        <p className="text-rose-700 text-xs font-bold mb-3">
          {" "}
          Error : {data.msg}
        </p>
      )}

      <RegisterForm isSubmitting={navigation.state === "submitting"} />
    </section>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();
  const confirmPwd = formData.get("confirmPw").trim();

  if (password !== confirmPwd)
    return { msg: "Password And Confirm Password must match !" };

  await handleRegister(email, password);
  return redirect("/login");
}

export default RegisterPage;
