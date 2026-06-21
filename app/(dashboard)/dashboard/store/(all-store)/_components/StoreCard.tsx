import { StoreType } from "@/shared/types/store-types";
import defaultStoreAvatar from "@/public/store/default-store-avatar-1.jpeg";
import defaultStoreAdminAvatar from "@/public/user/default-store-admin-avatar.jpeg";
import Image from "next/image";
import { capitalize } from "@/shared/utils/capitalize";

interface StoreCardProps {
  store: StoreType;
}

function StoreCard({ store }: StoreCardProps) {
  const storeAvatar = store.avatar || defaultStoreAvatar;
  const storeAdminAvatar = store.user.avatar || defaultStoreAdminAvatar;

  return (
    <div className="group w-full flex flex-col sm:flex-row gap-6 p-5 rounded-md border border-brand-mist-100 bg-brand-mist-100/10  shadow-sm shadow-brand-mist-300/60 transition-all duration-200 hover:shadow-md hover:border-brand-mist-200">
      {/* store-avatar */}
      <div className="relative w-full sm:w-40 h-40 shrink-0 rounded-md overflow-hidden bg-brand-mist-50 border border-brand-mist-100">
        <Image
          src={storeAvatar}
          alt={`${store.name}-avatar`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 160px"
        />
      </div>

      {/* details */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* name & badges */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h4 className="text-xl font-semibold text-brand-mist-700 truncate">
              {capitalize(store?.name)}
            </h4>
            {store.storeStatus === "PRIMARY" && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-emerald-200/10 text-brand-emerald-600 border border-brand-emerald-600">
                {store.storeStatus}
              </span>
            )}
          </div>

          {/* address */}
          <p className="text-sm font-medium text-brand-mist-600 mb-1 truncate">
            {capitalize(store.city)}, {capitalize(store.province)}
          </p>
          <p className="text-sm text-brand-mist-400 line-clamp-2">
            {capitalize(store.address)}, {capitalize(store.district)}
          </p>
        </div>

        {/* admin store */}
        <div className="mt-4 pt-4 border-t border-brand-mist-100 flex items-center gap-3">
          <div className="relative w-8 h-8 shrink-0 rounded-full overflow-hidden border border-brand-mist-200 bg-brand-mist-50">
            <Image
              src={storeAdminAvatar}
              alt={`${store.name}-owner-avatar`}
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-brand-mist-400 font-medium">
              Store Admin
            </p>
            <p className="text-sm font-semibold text-brand-mist-600 truncate">
              {capitalize(store.user.firstName)}{" "}
              {capitalize(store.user.lastName)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
