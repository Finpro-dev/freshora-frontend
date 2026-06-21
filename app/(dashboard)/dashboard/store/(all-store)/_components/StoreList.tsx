import { getAllStore } from "@/actions/get-all-store";
import Pagination from "@/shared/components/Pagination";
import { StoreType } from "@/shared/types/store-types";
import StoreCard from "./StoreCard";

interface PageProps {
  currentPage: number;
}
const LIMIT = 10;

async function StoreList({ currentPage }: PageProps) {
  const res = await getAllStore(currentPage, LIMIT);
  const stores: StoreType[] = res?.data?.stores;
  const totalPage = res?.data?.totalPage;

  return (
    <div>
      <section className="w-full flex flex-col gap-5">
        {stores?.map((store, index: number) => (
          <StoreCard key={index} store={store} />
        ))}
      </section>

      <section>
        <Pagination totalPages={totalPage} />
      </section>
    </div>
  );
}

export default StoreList;
