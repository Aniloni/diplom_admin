import "./Report.scss"
import Search from "../../components/search/Search";
import DatePicker from "../../components/datePicker/datePicker.js"
import Table from "../../components/table/Table.js"
import AverageCards from "../../components/AverageCards/AverageCards.js";
import ProvisionCategories from "../../API/ProvisionCategories";
import {useEffect, useState} from "react";

const Report = () => {

    const handleDownload = async () => {
        const response = await ProvisionCategories.download_excel({date_from: dateFrom, date_to: dateTo, city: city});
        //сознание  Blob-объект из данных, полученных от сервера
        const blob = new Blob([response.data], { type: 'application/octet-stream'}); // Указываем тип файла (например, PDF)

        const fileURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;

        console.log(response.headers)
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'report.xlsx';
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            if (fileNameMatch.length === 2)
                fileName = fileNameMatch[1];
        }
        link.setAttribute('download', fileName);
        link.click();

        URL.revokeObjectURL(fileURL);
    }

    const [dateTo, setDateTo] = useState(new Date());
    const [dateFrom, setDateFrom] = useState(new Date());

    useEffect(() => {
        let today = new Date();

        setDateFrom(new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()))
        setDateTo(today);
    }, []);


    const handleDateFromChange = date => {
        setDateFrom(new Date(date.$d));
    }

    const handleDateToChange = date => {
        setDateTo(new Date(date.$d));
    }

    const [city, setCity] = useState(false);
    const handleCityChange = city => {
        setCity(city);
    }

    return (
        <>
            <AverageCards onCityChange={handleCityChange} />
            <div className="report">

                <div className="header-report">
                    <p className="report-p">Отчет</p>
                    <Search></Search>
                </div>
                <div className="date-picker">
                    <DatePicker label={'Начало периода'} onDateChange={handleDateFromChange}></DatePicker>
                    <DatePicker label={'Окончание периода'} onDateChange={handleDateToChange}></DatePicker>
                    <button onClick={handleDownload} className="excel">Открыть развернутый отчет в excel</button>
                </div>
                <div className="table-report">
                    <Table city={city}></Table>
                </div>
            </div>
        </>
    );
};

export default Report;



