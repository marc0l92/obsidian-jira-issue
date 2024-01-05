import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string
  img: string
  description: JSX.Element
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    img: './img/home-easy-to-use1.1.png',
    description: (
      <>
        Well documented and easy to use thanks to the integrated wizard.
      </>
    ),
  },
  {
    title: 'Customizable',
    img: './img/home-customizable1.png',
    description: (
      <>
        Allows you to display the information you need for your role in the project.
      </>
    ),
  },
  {
    title: 'Integrated',
    img: './img/inlineIssues.png',
    description: (
      <>
        Allows to insert Jira Issue inside the flow of your notes.
      </>
    ),
  },
];

function Feature({ title, img, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={img} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
