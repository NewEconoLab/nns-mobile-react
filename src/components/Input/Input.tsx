// 输入框组件
import * as React from 'react';
import { observer } from 'mobx-react';
import correct from '../../img/right1.png';
import error from '../../img/wrong1.png';
import './input.less';

interface IProps {
	placeholder: string,
	status?: string,
	message?: string,
	value: string,
	onChange: (event: any) => void,
	style?: object,
	readonly?: boolean,
	type: string,
	onBlur?: (event: any) => void,
	color?: string,
}

@observer
export default class Input extends React.Component<IProps, {}> {
	constructor(props: IProps) {
		super(props);
	}
	// 监控输入内容
	public onInputChange = (event: any) => {
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}
	// 监控焦点
	public onInputBlur = (event: any) => {
		if (this.props.onBlur) {
			this.props.onBlur(event.target.value);
		}
	}
	public render() {
		return (
			<div className="input-group">
				<input
					className="input-icon"
					value={this.props.value}
					type={this.props.type}
					placeholder={this.props.placeholder}
					onChange={this.onInputChange}
					style={this.props.style}
					readOnly={this.props.readonly}
					onBlur={this.onInputBlur}
				/>
				<div className="input-tips">
					{this.props.status === 'success' && <img src={correct} alt="" />}
					{this.props.status === 'error' && <img src={error} alt="" />}
					<span className={this.props.color}>{this.props.message}</span>
				</div>
			</div>
		);
	}
}