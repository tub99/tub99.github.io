

var radarData={
    "chart": {
        "caption": "Comparison of Enterprise Level Antivirus Software",
        "canvasborderalpha": "0",
        "radarborderalpha": "50",
        "radarborderthickness": "1",
        "radarfillcolor": "FFFFFF",
        "showlabels": "1",
        "drawanchors": "0",
        "ymaxvalue": "10",
        "showlimits": "0",
        "bgcolor": "FFFFFF",
        "legendborderalpha": "0",
        "showborder": "0"
    },
    "categories": [
        {
            "category": [
                {
                    "label": "Centralized Deployability"
                },
                {
                    "label": "Centralized Signature Updating"
                },
                {
                    "label": "Active Firewall"
                },
                {
                    "label": "Centralized Access & Firewall"
                },
                {
                    "label": "Centralized Network Health Monitoring"
                },
                {
                    "label": "Cost"
                },
                {
                    "label": "Technical Support"
                }
            ]
        }
    ],
    "dataset": [
        {
            "seriesname": "Kaspersky",
            "color": "008ee4",
            "alpha": "40",
            "data": [
                {
                    "value": "8"
                },
                {
                    "value": "9"
                },
                {
                    "value": "9"
                },
                {
                    "value": "8"
                },
                {
                    "value": "7"
                },
                {
                    "value": "9"
                },
                {
                    "value": "8"
                }
            ]
        },
        {
            "seriesname": "Norton",
            "color": "6baa01",
            "alpha": "40",
            "data": [
                {
                    "value": "7"
                },
                {
                    "value": "6"
                },
                {
                    "value": "6"
                },
                {
                    "value": "4"
                },
                {
                    "value": "7"
                },
                {
                    "value": "6"
                },
                {
                    "value": "5"
                }
            ]
        }
    ]
};
function getData()
{
	return radarData;
}

