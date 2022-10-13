import { Icon } from 'semantic-ui-react';

interface props {
	display: string;
}

function BackToTop({ display = 'block' }: props) {
	function topFunction() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}

	return (
		<button className="toTopButton" style={{ display: `${display}` }} onClick={topFunction}>
			<Icon name="angle double up" />
		</button>
	);
}

export default BackToTop;
