import styles from './cv.module.sass';

const experience = [
  {
    role: 'Frontend Engineer',
    company: 'Freelance',
    period: '2022 — present',
    description: 'Building web applications with React, TypeScript, and modern tooling.',
  },
];

const skills = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Go'],
  Frontend: ['React', 'Webpack', 'Vite', 'Sass/CSS'],
  Tools: ['Git', 'Linux', 'Docker', 'Vim'],
};

const education = [
  {
    degree: 'Bachelor of Computer Science',
    school: 'University',
    period: '2020 — 2024',
  },
];

export const CV = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.name}>Geldyev Begench</h1>
        <p className={styles.tagline}>Software Engineer · Web Developer · Vim Enjoyer</p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.divider} />
        {experience.map((job) => (
          <div className={styles.entry} key={job.company}>
            <div className={styles.entryHeader}>
              <span className={styles.entryTitle}>{job.role}</span>
              <span className={styles.entryMeta}>{job.period}</span>
            </div>
            <span className={styles.entrySubtitle}>{job.company}</span>
            <p className={styles.entryDesc}>{job.description}</p>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <div className={styles.divider} />
        <div className={styles.skillsGrid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillGroup}>
              <span className={styles.skillCategory}>{category}</span>
              <div className={styles.skillList}>
                {items.map((skill) => (
                  <span key={skill} className={styles.skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.divider} />
        {education.map((edu) => (
          <div className={styles.entry} key={edu.school}>
            <div className={styles.entryHeader}>
              <span className={styles.entryTitle}>{edu.degree}</span>
              <span className={styles.entryMeta}>{edu.period}</span>
            </div>
            <span className={styles.entrySubtitle}>{edu.school}</span>
          </div>
        ))}
      </section>

      <div className={styles.download}>
        <a href="/public/Begench%20Geldyev(CV).pdf" download rel="noreferrer" target="_blank">
          download pdf ↓
        </a>
      </div>
    </div>
  );
};
