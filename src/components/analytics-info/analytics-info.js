import "./analytics-info.scss"

const Analytics_info = () =>{
    return(
        <div className="analytics_info">
            <div class="legend-item">
                <div class="legend-circle service-count"></div>
                <p>Количество оказанных услуг</p>
            </div>
            <div class="legend-item">
                <div class="legend-circle service-percentage"></div>
                <p>% оказанных услуг в зоне СПС</p>
            </div>
            <div class="legend-item">
                <div class="legend-circle service-time"></div>
                <p>Время оказания услуги</p>
            </div>
        </div>
    );
};

export default Analytics_info;