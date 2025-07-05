import Image from 'next/image';

interface VendorHeaderProps {
  vendorName: string;
  vendorLogo: string;
  activeTab: string;
}

export default function VendorHeader({ vendorName, vendorLogo, activeTab }: VendorHeaderProps) {
  const tabs = ['Dashboard', 'Inventory', 'Settings'];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {/* Left side - Vendor logo and name */}
        <div className="flex items-center gap-4">
          {/* DaisyUI: avatar component */}
          <div className="avatar">
            <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                src={vendorLogo}
                alt={`${vendorName} logo`}
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-base-content">{vendorName}</h2>
          </div>
        </div>

        {/* Right side - Navigation tabs */}
        <div className="flex gap-2">
          {/* DaisyUI: tabs component styled as buttons */}
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`btn ${
                activeTab === tab
                  ? 'btn-primary'
                  : 'btn-ghost'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
