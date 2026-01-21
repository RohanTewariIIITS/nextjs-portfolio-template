import Image from 'next/image'

interface ServiceCardTypes {
  icon: string
  title: string
  shortDescription: string
}

const ServiceCard: React.FC<ServiceCardTypes> = ({ title, shortDescription, icon }) => {
  return (
    <div className="bg-secondary border-border flex flex-col items-center rounded-[14px] border p-5">
      {(title.toLowerCase().includes('unity') || title.toLowerCase().includes('xml')) ? (
        <span
          className="my-1 flex items-center justify-center"
          style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff' }}
        >
          <Image
            src={icon}
            alt={title}
            className="w-14 h-14"
            style={{ objectFit: 'contain' }}
          />
        </span>
      ) : (
        <Image
          src={icon}
          alt={title}
          className={`my-1 ${
            title.toLowerCase().includes('sqlite')
              ? 'w-20 h-10'
              : title.toLowerCase().includes('railway')
              ? 'w-14 h-14'
              : 'size-14'
          }`}
          style={
            title.toLowerCase().includes('sqlite')
              ? { objectFit: 'contain', borderRadius: 8, background: '#fff' }
              : title.toLowerCase().includes('railway')
              ? { objectFit: 'contain', borderRadius: '50%', background: '#fff' }
              : {}
          }
        />
      )}
      <h5 className="text-accent mt-2 mb-5 text-center text-base font-semibold">{title}</h5>
      <div className="bg-primary rounded-2xl p-4">
        <p className="text-primary-content text-center text-sm font-normal">{shortDescription}</p>
      </div>
    </div>
  )
}

export default ServiceCard
