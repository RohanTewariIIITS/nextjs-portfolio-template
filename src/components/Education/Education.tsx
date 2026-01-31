import SectionHeading from '../SectionHeading/SectionHeading'

interface EducationItem {
  institution: string
  degree: string
  year: string
  score?: string
}

const educationData: EducationItem[] = [
  {
    institution: 'Indian Institute of Information Technology, Sonepat',
    degree: 'B.Tech in Information Technology',
    year: '2024 - 2028',
    score: 'CGPA: 9.29',
  },
  {
    institution: 'JEE Main 2024',
    degree: '',
    year: '2024',
    score: '98.03%ile',
  },
  {
    institution: 'CBSE Class 12th',
    degree: '',
    year: '2022 - 2023',
    score: '93.20%',
  },
  {
    institution: 'CBSE Class 10th',
    degree: '',
    year: '2020 - 2021',
    score: '98.17%',
  },
]

const Education = () => {
  return (
    <section id="education" className="my-14">
      <SectionHeading title="// Education" />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {educationData.map((item, index) => (
          <div
            key={index}
            className="bg-secondary border-border rounded-[14px] border p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-secondary-content text-sm font-medium">
                {item.institution}
              </h3>
            </div>
            {item.degree && (
              <p className="text-primary-content mt-1 text-xs">{item.degree}</p>
            )}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-tertiary-content text-xs">{item.year}</span>
              {item.score && (
                <span className="text-accent text-xs font-medium">{item.score}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education
