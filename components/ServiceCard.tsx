"use client";

export function ServicesCard({ service, handleOpenForm, pricing }: any) {
    console.log("🚀 ~ ServicesCard ~ service:", service)
    return (
        <div className="w-full group/card overflow-hidden rounded-xl group">
            <div
                style={
                    {
                        background: `url(${service.image})`,
                        backgroundSize: "cover"
                    }
                }
                className=
                " cursor-pointer overflow-hidden relative card h-40 w-full rounded-md shadow-xl  backgroundImage flex flex-col justify-end p-4"

            >
                <div className="absolute w-full h-full -z-0 top-0 left-0 transition duration-300 bg-black opacity-40 group-hover:opacity-80"></div>

                <div className="text content z-[20] flex flex-col items-start">
                    <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                        {service.name}
                    </h1>
                    {
                        service.name.toLowerCase() == "helper" ?
                            <>
                                <p className="font-normal text-sm text-gray-50 relative z-10">
                                    Per Helper Cost :  {pricing.helper.ratePerHelperPerHour} SEK
                                </p>
                            </>
                            :
                            service.name.toLowerCase() == "transport" ?
                                <>
                                    <p className="font-normal text-sm text-gray-50 relative z-10">
                                        Per KM Cost :  {pricing.transport.ratePerKm} SEK
                                    </p>
                                </>
                                :

                                <>
                                    <p className="font-normal text-sm text-gray-50 relative z-10">
                                        Per Cleaner Cost :  {pricing.cleaning.ratePerCleaner} SEK
                                    </p>
                                </>
                    }
                    <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                        {service.description}
                    </p>
                    <div className="flex items-center justify-start">

                        <button
                            onClick={() => handleOpenForm(service)}
                            className="gap-2.5 self-stretch hover:scale-105 transition-all duration-250 px-5 py-2.5 my-auto text-white rounded-xl bg-sky-800 border-solid  max-md:px-5">
                            Select {service.name}

                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
