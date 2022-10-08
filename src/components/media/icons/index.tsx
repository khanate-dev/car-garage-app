import { SvgProps } from 'react-native-svg';

import AgeIcon from './Age.icon';
import BirdIcon from './Bird.icon';
import FcrIcon from './Fcr.icon';
import MortalityIcon from './Mortality.icon';
import WeightIcon from './Weight.icon';

const icons: Record<string, (props: SvgProps) => JSX.Element> = {
	Age: AgeIcon,
	Bird: BirdIcon,
	Fcr: FcrIcon,
	Mortality: MortalityIcon,
	Weight: WeightIcon,
};

export default icons;

export { AgeIcon, BirdIcon, FcrIcon, MortalityIcon, WeightIcon };
