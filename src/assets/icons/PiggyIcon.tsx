import React from 'react';
import {IconProps} from "@/model/interface.ts";

const CustomIcon: React.FC<IconProps> = ({color = '#DEE4EE', width = '40px', height = '40px'}) => {
	return (
		<svg
			version="1.1"
			id="_x32_"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width={width}
			height={height}
			viewBox="0 0 512 512"
			xmlSpace="preserve"
		>
			<style type="text/css">
				{`
        .st0{fill:${color};}
      `}
			</style>
			<g>
				<path className="st0" d="M287.743,162.227c43.766,0,79.234-35.469,79.234-79.219S331.509,3.773,287.743,3.773
		c-43.734,0-79.219,35.484-79.219,79.234S244.009,162.227,287.743,162.227z M287.743,23.602c32.781,0,59.422,26.625,59.422,59.406
		c0,32.75-26.641,59.406-59.422,59.406c-32.75,0-59.406-26.656-59.406-59.406C228.337,50.227,254.993,23.602,287.743,23.602z"/>
				<path className="st0" d="M273.04,114.055v8.344h7.516v-8.344h6.813v8.344h7.516v-8.391c2.781-0.172,5.766-0.594,8.141-1.313
		c3.016-0.922,4.766-2.188,6.828-3.781c2.047-1.625,3.625-3.531,4.703-5.781c1.078-2.219,1.609-4.641,1.609-7.266
		c-0.016-7.297-4.125-12.266-12.938-13.781c2.891-1.141,6.109-4.406,7.078-5.563s1.688-2.391,2.141-3.719
		c0.453-1.344,0.688-2.734,0.688-4.188c0-2.531-0.453-4.813-1.391-6.828c-0.922-2.047-2.422-3.703-4.328-5.203
		c-3.453-2.672-8.469-3.953-12.531-4.281v-8.719h-7.516v8.609l-6.813-0.047v-8.563h-7.516v8.547h-5.969h-7.719v6.844
		c0,1.453-0.109,2.359,1.438,2.672c0.109,0.016,0.313,0.047,0.578,0.094c0.234,0.047,3.25,0.141,3.922,0.219
		c1.016,0.156,1.781,0.703,1.781,2.109v37.063c0,1.156-0.578,2.297-1.781,2.297c-0.672,0-3.688,0.188-3.922,0.219
		c-0.266,0.063-0.453,0.094-0.578,0.109c-1.547,0.313-1.438,1.219-1.438,2.672v7.625h7.719H273.04z M298.493,95.68
		c0,0.984-0.172,1.922-0.484,2.813c-0.313,0.875-0.844,1.656-1.563,2.313c-0.719,0.641-1.672,1.188-2.859,1.578
		c-1.219,0.406-2.703,0.594-4.453,0.594h-7.906V88.992h7.859c1.688,0,3.125,0.156,4.297,0.469c1.188,0.313,2.156,0.75,2.891,1.328
		c0.781,0.594,1.328,1.297,1.672,2.109C298.321,93.727,298.493,94.664,298.493,95.68z M280.978,63.102h6.078
		c3.219,0,5.578,0.547,7.109,1.594c1.5,1.031,2.266,2.813,2.266,5.281c0,2.406-0.859,4.156-2.531,5.25
		c-1.672,1.109-4.141,1.656-7.359,1.656h-5.563V63.102z"/>
				<path className="st0" d="M507.478,170.32c-3.469-1.156-7.219,0.719-8.375,4.188c-3,8.891-7,13.953-11.516,17.313
		c-1.313,0.984-2.734,1.781-4.188,2.516c0.719-2.719,1.109-5.516,1.125-8.359c-0.016-4.453-1-9.047-3.453-13.156
		c-2.109-3.547-5.094-6.375-8.484-8.234c-3.391-1.906-7.219-2.891-11.094-2.891c-3.75,0-7.547,0.969-11.031,2.906
		c-0.063,0.016-0.109,0.031-0.156,0.063c-0.094,0.047-0.172,0.078-0.266,0.125l-0.016,0.016l0,0c-0.016,0-0.016,0-0.016,0
		l-0.156,0.094c0,0.016,0,0.016-0.016,0.016c0,0,0,0-0.016,0.016c-0.125,0.063-0.219,0.156-0.328,0.25
		c-0.031,0-0.047,0.016-0.063,0.016c-3.266,2.109-5.891,4.891-7.656,8.109c-1.891,3.391-2.875,7.203-2.875,11.094
		c-0.016,3.969,1.047,8.016,3.203,11.656h0.016c2.734,4.531,6.766,8.203,11.438,10.891c0.906,0.516,1.844,0.953,2.797,1.406
		c-2.188,1.375-4.641,2.656-7.344,3.75c-3.594,1.469-7.641,2.563-12.016,3.141c-14.672-22.516-36.531-43.266-67.906-60.703
		c-4.984-2.75-10.078-5.188-15.25-7.344c-8.813,9.063-19.438,16.344-31.313,21.188c-4.656,1.906-5.188,5.844,0.25,6.531
		c4.813,0.594,9.609,1.297,14.375,2.125v23.813c-40.219-5.078-70.188-5.078-110.406,0v-23.813
		c6.828-1.156,13.688-2.125,20.594-2.859c6.375-0.672,6.297-5.281,0.344-8.172c-11.25-5.438-21.203-13.109-29.344-22.406
		c-25.172,6.891-47.563,16.844-64.094,27.172c-29.5-18.656-55.734-13.797-63.703-11.438l10.844,57.906
		c-21.688,26.813-39.141,35.797-39.141,35.797l-43.828,8.641c-6.203,0-11.984,3.125-15.391,8.313
		c-3.406,5.172-3.969,11.719-1.516,17.406l33.641,95.859c2.922,6.75,9.563,11.125,16.906,11.125l71.875,15.047l30.297,76.297
		c15.172,33.563,55.75,26.531,57.375-1.078l6.484-37.875h104.984c0,0,3.266,16.875,4.875,31.391
		c2.422,21.906,34.641,50.328,67.109,6.484c37.375-50.469,97-166.031,49.031-257.281c6.109-1.391,11.672-3.484,16.391-6.094
		c4.047-2.234,7.531-4.781,10.438-7.406c1.063-0.969,2.016-1.938,2.922-2.922c0.063-0.016,0.141-0.031,0.188-0.047l0.016,0.016
		c7.031-1.156,14.625-3.422,21.438-8.469c6.828-5.031,12.547-12.797,16.188-23.766C512.806,175.211,510.931,171.477,507.478,170.32z
		 M470.134,192.445c-0.719,2.063-1.781,3.984-3,5.547c-2.266-0.344-4.734-1.234-6.969-2.516c-2.969-1.672-5.438-4.078-6.688-6.203
		v0.016c-0.922-1.563-1.344-3.219-1.344-4.891c0-1.625,0.422-3.25,1.203-4.672c0.797-1.406,1.906-2.609,3.391-3.5
		c1.516-0.875,3.141-1.281,4.766-1.281c1.625-0.016,3.25,0.406,4.672,1.188c1.422,0.797,2.641,1.953,3.547,3.469
		c0.984,1.672,1.563,3.859,1.563,6.375C471.29,188.07,470.884,190.336,470.134,192.445z"/>
			</g>
		</svg>
	)
}

export default CustomIcon