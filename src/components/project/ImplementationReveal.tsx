import { useTranslation } from 'react-i18next';
import commonDetails from '../../data/commonProjectsDetails.json';
import BeforeAfterReveal from './BeforeAfterReveal';
import '../../styles/project/Implementation.scss';

interface CommonDetails {
  titleSolutionImplementation: string;
}

interface Props {
  project: {
    projectDetails?: Record<string, string>;
    images: {
      [key: string]: string | string[];
    };
    id: string;
  };
  sectionId?: string;
}

const ImplementationReveal = ({ project, sectionId }: Props) => {
  const { t, i18n } = useTranslation();
  const common: CommonDetails = (commonDetails as CommonDetails[])[0];

  const details = project.projectDetails ?? {};
  const implKey = 'solution-implementation';
  const hasImpl = Boolean(details[implKey]) && i18n.exists(details[implKey]!);

  const slider = Array.isArray(project.images?.slider)
    ? project.images.slider
    : [];
  const [before, after] = slider;

  return (
    <section
      className='projects__solution-implementation section section--half'
      id={sectionId}
    >
      <div className='projects__container'>
        <h1 className='h1 section__title'>
          <span>05. </span>
          {t(common.titleSolutionImplementation)}
        </h1>
        <div className='projects__content'>
          {hasImpl && (
            <h3 className='h3 implementation__text'>{t(details[implKey]!)}</h3>
          )}
          {before && after ? (
            <BeforeAfterReveal before={before} after={after} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ImplementationReveal;
