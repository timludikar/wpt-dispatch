import React, { Component } from 'react';

export class Section extends Component {
  render(){
    return (
      <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp" style={{position: 'relative', 'maxWidth': '840px', 'marginTop':'40px'}} {...this.props} >
      </section>
    );
  }
}
