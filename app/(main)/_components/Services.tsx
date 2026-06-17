import { serviceStatic } from "../_statics/service-static";

function Services() {
  return (
    <section className="w-full x-5 py-3 grid grid-cols-3 lg:grid-cols-6 items-center space-y-0.5 bg-brand-emerald-200/20 mt-10 rounded-xl shadow-md shadow-brand-emerald-200/50 divide-x divide-brand-emerald-200 border border-brand-emerald-200">
      {serviceStatic?.map((service, i: number) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row h-25 p gap-3 items-center justify-center px-2">
          {/* icon */}
          <div>{service.logo}</div>

          {/* content */}
          <div>
            <h4 className="text-brand-mist-600 text-center sm:text-start text-sm sm:text-base font-semibold">
              {service.heading}
            </h4>
            <p className="text-brand-mist-400 text-xs sm:text-sm">
              {service.subHeading}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Services;
