import BackButton from "@/shared/components/BackButton";
import ProfileForm from "./_components/ProfileForm";

function page() {
  return (
    <main className="min-h-dvh">
      <div className="flex justify-center">
        <section className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[45%]">
          <div className="pt-10 pb-5 sm:pb-15">
            <div className="flex">
              <BackButton />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-mist-600 py-2 sm:py-3">
              Edit Profile
            </h1>
            <p className="text-sm text-brand-mist-500">
              Update your profile information
            </p>
          </div>

          {/* profile overview */}
          <div>
            <ProfileForm />
          </div>
        </section>
      </div>
    </main>
  );
}

export default page;
