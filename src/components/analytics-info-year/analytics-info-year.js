import "./analytics-info-year.scss"

const Analytics_info_year = (props) =>{
    return(
        <div className="analytics_info_year">
            <div class="legend-item_year">
                <div class="legend-circle_year service-count_year"></div>
                <p>{props.count}</p>
            </div>
            <div class="legend-item_year">
                <div class="legend-circle_year service-percentage_year"></div>
                <p>{props.percent}</p>
            </div>
            <div class="legend-item_year">
                <div class="legend-circle_year service-time_year"></div>
                <p>{props.time}</p>
            </div>
        </div>
    );
};

export default Analytics_info_year;