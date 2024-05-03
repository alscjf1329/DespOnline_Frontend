const CharacterImgSrc_1 = {
    BELPHEGOR: "https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_BELPHEGOR.png",
    ENLIL: "https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_ENLIL.png",
    REVENANT: "https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_REVENANT.png",
};
const CharacterImgSrc_2 = {
    VALKYRIE: "https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_VALKYRIE.png",
    EMPTY: "https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_UNKNOWN.png",
    UNKNOWN1: "https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_UNKNOWN.png",
};
const CharacterImgSrc_3 = {
    UNKNOWN2: "https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_UNKNOWN.png",
    UNKNOWN3: "https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_UNKNOWN.png",
    UNKNOWN4: "https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_UNKNOWN.png",
};

const CharacterPlayVideo = {
    BELPHEGOR: "4bed7D_jXYo",
    ENLIL: "PFEUnM1fcIo",
    REVENANT: "9pQwUo3i7cw",
    VALKYRIE: "F0DswR9DYro",
};

const CharacterExplanation = {
    BELPHEGOR: "마법사",
    ENLIL: "궁수",
    REVENANT: "암살자",
    VALKYRIE: "전사",
};

const CharacterRaderChart = {
    BELPHEGOR: {
        chartData: {
            labels: ["공격력", "생존력", "기동력", "PVE", "PVP"],
            datasets: [
                {
                    label: "BELPHEGOR",
                    data: [5, 1, 1, 5, 3],
                    fill: true,
                    backgroundColor: "rgba(220, 147, 0, 0.2)",
                    borderColor: "rgb(220, 147, 0)",
                    pointBackgroundColor: "rgb(220, 147, 0)",
                    pointBorderColor: "rgb(220, 147, 0)",
                    pointHoverBackgroundColor: "rgb(255, 255, 255)",
                    pointHoverBorderColor: "rgb(220, 147, 0)",
                },
            ],
        },
    },
    ENLIL: {
        chartData: {
            labels: ["공격력", "생존력", "기동력", "PVE", "PVP"],
            datasets: [
                {
                    label: "ENLIL",
                    data: [5, 2, 4, 4, 2],
                    fill: true,
                    backgroundColor: "rgba(220, 147, 0, 0.2)",
                    borderColor: "rgb(220, 147, 0)",
                    pointBackgroundColor: "rgb(220, 147, 0)",
                    pointBorderColor: "rgb(220, 147, 0)",
                    pointHoverBackgroundColor: "rgb(255, 255, 255)",
                    pointHoverBorderColor: "rgb(220, 147, 0)",
                },
            ],
        },
    },
    REVENANT: {
        chartData: {
            labels: ["공격력", "생존력", "기동력", "PVE", "PVP"],
            datasets: [
                {
                    label: "REVENANT",
                    data: [4, 3, 5, 2, 5],
                    fill: true,
                    backgroundColor: "rgba(220, 147, 0, 0.2)",
                    borderColor: "rgb(220, 147, 0)",
                    pointBackgroundColor: "rgb(220, 147, 0)",
                    pointBorderColor: "rgb(220, 147, 0)",
                    pointHoverBackgroundColor: "rgb(255, 255, 255)",
                    pointHoverBorderColor: "rgb(220, 147, 0)",
                },
            ],
        },
    },
    VALKYRIE: {
        chartData: {
            labels: ["공격력", "생존력", "기동력", "PVE", "PVP"],
            datasets: [
                {
                    label: "VALKYRIE",
                    data: [3, 4, 1.5, 3, 3],
                    fill: true,
                    backgroundColor: "rgba(220, 147, 0, 0.2)",
                    borderColor: "rgb(220, 147, 0)",
                    pointBackgroundColor: "rgb(220, 147, 0)",
                    pointBorderColor: "rgb(220, 147, 0)",
                    pointHoverBackgroundColor: "rgb(255, 255, 255)",
                    pointHoverBorderColor: "rgb(220, 147, 0)",
                },
            ],
        },
    },
};

const CharacterRaderChartOptions = {
    chartOptions: {
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 15,
                    },
                    color: "rgba(255, 255, 255, 0.7)",
                },
            },
        },
        elements: {
            line: {
                borderWidth: 2,
            },
        },
        scales: {
            r: {
                ticks: {
                    stepSize: 1,
                    color: "rgba(255, 255, 255, 0.7)",
                    backdropColor: "transparent",
                    font: {
                        size: 15,
                        weight: "bold",
                    },
                },
                angleLines: {
                    display: false,
                },
                suggestedMin: 0,
                suggestedMax: 5,
                grid: {
                    color: "rgba(255, 255, 255, 0.7)",
                },
                pointLabels: {
                    color: "rgba(255, 255, 255, 0.7)",
                    font: {
                        size: 15,
                        weight: "bold",
                    },
                },
            },
        },
    },
};

export { CharacterImgSrc_1, CharacterImgSrc_2, CharacterImgSrc_3, CharacterPlayVideo, CharacterRaderChart, CharacterRaderChartOptions, CharacterExplanation };
