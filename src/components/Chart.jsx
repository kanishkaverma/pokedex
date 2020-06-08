import { Doughnut } from "react-chartjs-2";

import React, { Component } from "react";

class chart extends Component {
  constructor(props) {
    super(props);
    const {
      stats: [a, b, c, d, e, f],
    } = this.props;

    this.state = {
      labels: [
        a.stat.name,
        b.stat.name,
        c.stat.name,
        d.stat.name,
        e.stat.name,
        f.stat.name,
      ],
      datasets: [
        {
          backgroundColor: [
            "#f5b841",
            "#393e41",
            "#87bcde",
            "#81171b",
            "#805e73",
            "#b4adea",
          ],
          hoverBackgroundColor: [
            "#f5b841",
            "#393e41",
            "#87bcde",
            "#81171b",
            "#805e73",
            "#b4adea",
          ],
          data: [
            a.base_stat,
            b.base_stat,
            c.base_stat,
            d.base_stat,
            e.base_stat,
            f.base_stat,
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <div className="chart">
          <Doughnut data={this.state} />
        </div>
      </div>
    );
  }
}

export default chart;
