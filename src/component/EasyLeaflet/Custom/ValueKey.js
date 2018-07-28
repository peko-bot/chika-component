/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-28 08:40:27
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 08:41:11
 */
import React from 'react';

/**键值对绑定 */
export class ValueKey extends React.Component {
	constructor (props) {
		super(props);
		this.state = {

		};
	}
	render () {
		const { config, dataSource } = this.props;

		return (
			<div className='keyValue_box'>
				<div className='keyValue_title' style={{ backgroundColor: config.tBgColor || '#fff', color: config.tColor || '#000', width: config.width || 100 }}>{dataSource[config.title]}</div>
				{
					config.rows.map((item, i) => {

						return <div className='keyValue_row'><div style={{ width: item.nWidth || '50%', backgroundColor: item.bgColor || '#fff' }}>{item.name}</div><div style={{ width: item.vWidth || '50%', backgroundColor: item.bgColor || '#fff' }}>{dataSource[item.key]}</div></div>;
					})
				}
				<div style={{ height: 1, clear: 'both' }}></div>
			</div>
		);
	}
}