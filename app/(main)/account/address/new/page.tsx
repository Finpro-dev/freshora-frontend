import BackButton from "@/shared/components/BackButton";
import CreateAddressForm from "./_components/CreateAddressForm";
import MapWrapper from "./_components/MapWrapper";

function page() {
  return (
    <main className="min-h-dvh">
      <div className="flex justify-center">
        <section className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[60%]">
          <div className="pt-10 pb-5 sm:pb-15">
            <div className="flex">
              <BackButton />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-mist-600 py-2 sm:py-3">
              Create Address
            </h1>
            <p className="text-sm text-brand-mist-500">
              Add new address to your account
            </p>
          </div>
        </section>
      </div>

      {/* create address form */}
      <div className="flex justify-center">
        <section className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[60%] px-5 py-5 shadow-sm shadow-brand-mist-300 border border-brand-mist-100 rounded-xl">
          <MapWrapper />
          <CreateAddressForm />
        </section>
      </div>
    </main>
  );
}

export default page;
