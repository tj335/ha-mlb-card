# Home Assistant MLB Card
A Home Assistant frontend custom card for the [ha-mlb](https://github.com/tj335/hacs-mlb) integration.

#### &nbsp;&nbsp;&nbsp;STATUS_SCHEDULED

![STATUS_SCHEDULED](https://user-images.githubusercontent.com/9123670/138403165-fe83a2f1-7ecd-4b47-8915-17c84d69a8e5.png)

#### &nbsp;&nbsp;&nbsp;STATUS_IN_PROGRESS / STATUS_RAIN_DELAY

![STATUS_IN_PROGRESS](https://user-images.githubusercontent.com/9123670/138606167-0d6416e4-e58b-454f-8cc3-e67dcbf42372.png)

#### &nbsp;&nbsp;&nbsp;STATUS_FINAL

![STATUS_FINAL](https://user-images.githubusercontent.com/9123670/138403233-c61f13d8-6aad-43ac-ae45-213b767d7f96.png)

#### &nbsp;&nbsp;&nbsp;STATUS_POSTPONED

#### &nbsp;&nbsp;&nbsp;UNKNOWN

![UNKNOWN](https://user-images.githubusercontent.com/9123670/138403291-bbded2aa-c8d4-42f7-b7bf-1578436c1076.png)


## HACS Installation
 - In the HACS UI, click the 3 dots in the upper right
 - Click 'Add Custom Repository'
 - Fill in the repo url https://github.com/tj335/ha-mlb-card and choose 'Lovelace' category.
 - install the custom card
 - Add the following to your resources
```
url: /hacsfiles/ha-mlb-card/ha-mlb-card.js
type: module
```

## Manual Installation
 - Download [ha-mlb-card.js](https://raw.githubusercontent.com/tj335/ha-mlb-card/main/dist/ha-mlb-card.js)
 - Copy to www/community/ha-mlb-card/ (make the ha-mlb-card directory)
 - Add the following to your resources
```
url: /hacsfiles/ha-mlb-card/ha-mlb-card.js
type: module
```

## Options
| Name | Description | Default | Required |  Values |
| --- | --- | --- | --- | --- |
| `entity` | Name of ha-mlb sensor | `sensor.mlb` | Yes  | Valid sensor |
| `outline` | Outline team colors (helpful w/ dark themes) |`false` | No |  `true` `false` |
| `outline_color` | Specifies outline color. | `white` | No |  CSS color or hex value  |

## Examples
```
type: 'custom:mlb-card'
entity: sensor.mlb
outline: true
outline_color: deeppink
```
![example](https://user-images.githubusercontent.com/9123670/138405243-8e42db4f-7d69-40bc-8ea7-624c31a957a9.png)


```
type: 'custom:mlb-card'
entity: sensor.mlb
outline: true
outline_color: '#ffe500'
```
![example2](https://user-images.githubusercontent.com/9123670/138405612-8efbb117-4f4b-4eb9-8ef0-339e9b35c868.png)

## Minimal Required Configuration
```
type: 'custom:mlb-card'
entity: sensor.mlb
```
Where `sensor.mlb` is the sensor name from the [ha-mlb](https://github.com/tj335/hacs-mlb) integration.
