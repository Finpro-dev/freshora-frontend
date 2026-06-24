import StoreMapWrapper from "../(all-store)/[storeId]/_components/StoreMapWrapper";
import CreateStoreForm from "./_components/CreateStoreForm";

function page() {
  return (
    <main className="px-5 pt-25 sm:pt-10 flex flex-col min-h-screen w-full bg-slate-50">
      <div className="w-full flex flex-col lg:flex-row gap-5">
        <section className="w-full lg:w-[50%] h-112.5 lg:h-175 flex flex-col px-2 py-2 border border-brand-mist-300 rounded-md shadow-md shadow-brand-mist-300/30">
          <StoreMapWrapper />
        </section>

        <section className="w-full lg:w-[50%] px-2 py-2 ">
          <CreateStoreForm />
        </section>
      </div>
    </main>
  );
}

export default page;
