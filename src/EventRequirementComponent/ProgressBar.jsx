import React, { Component } from 'react';


const ProgressBar = class extends Component {
    toggleContribute = () => {
        this.props.toggleContribute();
    }

    render() {
        const percentString = String(Math.ceil((this.props.current / this.props.total) * 100));
        return (
            <div className="box">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div>
                                <div className="title">
                                    {this.props.name}
                                </div>
                                <div className="">
                                    {this.props.description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-primary" onClick={this.props.toggleContribute}>
                                {this.props.isContributing ? 'Cancel' : 'Contribute'}
                            </button>
                        </div>
                    </div>
                </div>
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="item" />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <div>
                                <div className="is-grey">
                                    <b>{this.props.current}/{this.props.total}</b> - Total
                                </div>
                                <progress className="progress is-success" value={percentString} max="100" />
                                <div className="is-grey">
                                    <b>1/{this.props.total}</b> - Your contribution
                                </div>
                                <progress className="progress is-warning" value="10" max="100" />
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
};

export default ProgressBar;
