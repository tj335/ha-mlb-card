import { html, LitElement } from "https://unpkg.com/lit?module";

class MLBCard extends LitElement {

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    this._config = config;
  }
  getCardSize() {
    return 5;
  }
  
  render() {
    if (!this.hass || !this._config) {
      return html` <ha-card>Invalid Configuration</ha-card> `;
    }
	
    const stateObj = this.hass.states[this._config.entity];
    const outline = this._config.outline;
    const outlineColor = this._config.outline_color;
    const homeTeamProb = stateObj.attributes.home_team_odds_win_pct;
    const awayTeamProb = stateObj.attributes.away_team_odds_win_pct;
	
	var outColor = outlineColor;

	if (stateObj.state == 'STATUS_SCHEDULED' || stateObj.state == 'STATUS_IN_PROGRESS' || stateObj.state == 'STATUS_FINAL' || stateObj.state == 'STATUS_POSTPONED' || stateObj.state == 'STATUS_RAIN_DELAY') {
		var homeTeamLogo = stateObj.attributes.home_team_logo;
		var awayTeamLogo = stateObj.attributes.away_team_logo;

		var hScr = stateObj.attributes.home_team_runs;
		var aScr = stateObj.attributes.away_team_runs;
		
		var dateForm = new Date (stateObj.attributes.date);
		var gameDay = dateForm.toLocaleDateString('en-US', { weekday: 'long' });
		var gameTime = dateForm.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' });
		var gameMonth = dateForm.toLocaleDateString('en-US', { month: 'short' });
		var gameDate = dateForm.toLocaleDateString('en-US', { day: '2-digit' });

		if (Boolean(stateObj.state == 'STATUS_FINAL') && Number(hScr) > Number(aScr)) {
			var awayTeamScoreOpacity = 0.6;
			var homeTeamScoreOpacity = 1;
			var homeTeamPitcherOfRecord = 'W: ' + stateObj.attributes.winning_pitcher;
			var homeTeamPitcherOfRecordStats = stateObj.attributes.winning_pitcher_wins + '-' + stateObj.attributes.winning_pitcher_losses + ' ERA: ' + stateObj.attributes.winning_pitcher_era;
			var awayTeamPitcherOfRecord = 'L: ' + stateObj.attributes.losing_pitcher;
			var awayTeamPitcherOfRecordStats = stateObj.attributes.losing_pitcher_wins + '-' + stateObj.attributes.losing_pitcher_losses + ' ERA: ' + stateObj.attributes.losing_pitcher_era;
		}
		if (Boolean(stateObj.state == 'STATUS_FINAL') && Number(hScr) < Number(aScr)) {
			var awayTeamScoreOpacity = 1;
			var homeTeamScoreOpacity = 0.6;
			var homeTeamPitcherOfRecord = 'L: ' + stateObj.attributes.losing_pitcher;
            var homeTeamPitcherOfRecordStats = stateObj.attributes.losing_pitcher_wins + '-' + stateObj.attributes.losing_pitcher_losses + ' ERA: ' + stateObj.attributes.losing_pitcher_era;
			var awayTeamPitcherOfRecord = 'W: ' + stateObj.attributes.winning_pitcher;
            var awayTeamPitcherOfRecordStats = stateObj.attributes.winning_pitcher_wins + '-' + stateObj.attributes.winning_pitcher_losses + ' ERA: ' + stateObj.attributes.winning_pitcher_era;
		}
		if (Boolean(stateObj.state == 'STATUS_FINAL') && Number(hScr) == Number(aScr)) {
			var awayTeamScoreOpacity = 1;
			var homeTeamScoreOpacity = 1;
			var homeTeamPitcherOfRecord = 'T: ' + stateObj.attributes.winning_pitcher;
			var awayTeamPitcherOfRecord = 'T: ' + stateObj.attributes.losing_pitcher;
		}
		
		if (stateObj.attributes.runner_on_1st == true) {
		    var runnerFirst = 1;
		} else {
		    var runnerFirst = 0;
		}
		
		if (stateObj.attributes.runner_on_2nd == true) {
		    var runnerSecond = 1;
		} else {
		    var runnerSecond = 0;
		}
		
		if (stateObj.attributes.runner_on_3rd == true) {
		    var runnerThird = 1;
		} else {
		    var runnerThird = 0;
		}
		
		if (stateObj.attributes.inning_description) {
		    const inn_desc = stateObj.attributes.inning_description;
		    if (inn_desc.slice(0, 3) == 'Top') {
		        var awayTeamPossOpacity = 1;
		        var homeTeamPossOpacity = 0;
		    } else {
		        var awayTeamPossOpacity = 0;
		        var homeTeamPossOpacity = 1;
		    }
		} else {
		    var awayTeamPossOpacity = 1;
		    var homeTeamPossOpacity = 1;
		}
		
		if (stateObj.attributes.venue_indoor == 'true') {
		    var weatherDesc = 'Indoors';
		} else {
		    if (stateObj.attributes.weather_conditions && stateObj.attributes.weather_temp) {
		        var weatherDesc = stateObj.attributes.weather_conditions + ', ' + stateObj.attributes.weather_temp + '°F';
		    } else {
		        var weatherDesc = 'Weather: N/A';
		    }
		}
		
    } else {
		var homeTeamLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8rGHWIehoVzpadKbNwJhQ_IxdUbKv81ed06p_3fRsSvmJzluS';
		var awayTeamLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8rGHWIehoVzpadKbNwJhQ_IxdUbKv81ed06p_3fRsSvmJzluS';
	  
		var hScr = 0;
		var aScr = 0;
    }

    if (outline == true) {
		var clrOut = 1;
		var toRadius = 4;
		var probRadius = 7;
    }
    if (!this._config.outline || outline == false){
      var clrOut = 0;
      var toRadius = 3;
      var probRadius = 6;
    }
    if (!this._config.outline_color) {
      var outColor = '#ffffff';
    }
    
	var awayTeamColor = stateObj.attributes.away_team_colors[1];
	var homeTeamColor = stateObj.attributes.home_team_colors[0];
/*
stateObj.state could be "STATUS_SCHEDULED", "STATUS_IN_PROGRESS", "STATUS_POSTPONED", "STATUS_FINAL", "STATUS_RAIN_DELAY", "Unknown", "Warmup", or ????
*/

    if (!stateObj) {
      return html` <ha-card>Unknown entity: ${this._config.entity}</ha-card> `;
    } else {
		if (stateObj.state == 'unavailable') {
		  return html`
			<style>
			  ha-card {padding: 10px 16px;}
			</style>
			<ha-card>
			  Sensor unavailable: ${this._config.entity}
			</ha-card> 
		  `;
		} else if (stateObj.state == 'STATUS_FINAL') {
		  return html`
			<style>
			  .card { position: relative; overflow: hidden; padding: 16px 16px 20px; font-weight: 400; }
			  .away-team-bg { opacity: 0.08; position: absolute; top: -30%; left: -20%; width: 58%; z-index: 0; }
			  .home-team-bg { opacity: 0.08; position: absolute; top: -30%; right: -20%; width: 58%; z-index: 0; }
			  .card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 99; }
			  .team { text-align: center; width: 35%;}
			  .team img { height: 90px; }
			.teamls { text-align: center; }
			.teamls img { height: 15px; }
			  .score { font-size: 3em; text-align: center; }
			  .hometeamscr { opacity: ${homeTeamScoreOpacity}; }
			  .awayteamscr { opacity: ${awayTeamScoreOpacity}; }
			  .divider { font-size: 2.5em; text-align: center; opacity: 0; }
			  .name { font-size: 1.4em; margin-bottom: 4px; }
			  .line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
			  .status { font-size: 1.2em; text-align: center; margin-top: -21px; }
			.sub1, .sub2, .sub3, .sub4 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
			.venue { text-align: left; }
			.location { text-align: right; }
             .line-score-table { width: 100%; border-collapse: collapse; text-align: center; }
             .line-score-cell { border: 0.5px solid #999; text-align: center; }
             table.ls { width: 100%; text-align: center; border: 0.5px solid #999; border-collapse: collapse; }
             th, td, tr { border: 0.5px solid #999; text-align: center; border-collapse: collapse; }
             th.teamls, td.teamls { border: 0.5px solid #999; text-align: left; width: 20%; border-collapse: collapse; }
			</style>
			<ha-card>
			  <div class="card">
				<img class="away-team-bg" src="${awayTeamLogo}" />
				<img class="home-team-bg" src="${homeTeamLogo}" />
				<div class="card-content">
				  <div class="team">
					  <img src="${awayTeamLogo}" />
					  <div class="name">${stateObj.attributes.away_team_city}<br>${stateObj.attributes.away_team_name}</div>
					  <div class="record">${stateObj.attributes.away_team_record}</div>
                      <div class="pitcher">${awayTeamPitcherOfRecord}<br>${awayTeamPitcherOfRecordStats}</div>
				  </div>
				  <div class="score awayteamscr">${aScr}</div>
				  <div class="divider">-</div>
				  <div class="score hometeamscr">${hScr}</div>
				  <div class="team">
					<img src="${homeTeamLogo}" />
					<div class="name">${stateObj.attributes.home_team_city}<br>${stateObj.attributes.home_team_name}</div>
					<div class="record">${stateObj.attributes.home_team_record}</div>
                    <div class="pitcher">${homeTeamPitcherOfRecord}<br>${homeTeamPitcherOfRecordStats}</div>

				  </div>
				</div>
				<div class="status">FINAL</div>
				<div class="line"></div>
				<div class="sub3">
				  <div class="venue">${stateObj.attributes.venue_name}</div>
				 <div class=location">${stateObj.attributes.venue_city}, ${stateObj.attributes.venue_state}</div>
				</div>

				<div class="line"></div>

				  <table class="ls">
					 <thead>
					   <tr>
						 <th class="teamls">Scoring</th>
						 <th>1</th>
						 <th>2</th>
						 <th>3</th>
						 <th>4</th>
						 <th>5</th>
						 <th>6</th>
						 <th>7</th>
						 <th>8</th>
						 <th>9</th>
						 <th>R</th>
						 <th>H</th>
						 <th>E</th>
					   </tr>
					 </thead>
					 <tbody>
					   <tr>
						 <td class="teamls"><img src="${awayTeamLogo}" style="height:15px;" />&nbsp; ${stateObj.attributes.away_team_abbr}</td>
						 <td>${stateObj.attributes.away_team_ls_1}</td>
						 <td>${stateObj.attributes.away_team_ls_2}</td>
						 <td>${stateObj.attributes.away_team_ls_3}</td>
						 <td>${stateObj.attributes.away_team_ls_4}</td>
						 <td>${stateObj.attributes.away_team_ls_5}</td>
						 <td>${stateObj.attributes.away_team_ls_6}</td>
						 <td>${stateObj.attributes.away_team_ls_7}</td>
						 <td>${stateObj.attributes.away_team_ls_8}</td>
						 <td>${stateObj.attributes.away_team_ls_9}</td>
						 <td>${stateObj.attributes.away_team_runs}</td>
						 <td>${stateObj.attributes.away_team_hits}</td>
						 <td>${stateObj.attributes.away_team_errors}</td>
					   </tr>
					   <tr>
						 <td class="teamls"><img src="${homeTeamLogo}" style="height:15px;" />&nbsp; ${stateObj.attributes.home_team_abbr}</td>
						 <td>${stateObj.attributes.home_team_ls_1}</td>
						 <td>${stateObj.attributes.home_team_ls_2}</td>
						 <td>${stateObj.attributes.home_team_ls_3}</td>
						 <td>${stateObj.attributes.home_team_ls_4}</td>
						 <td>${stateObj.attributes.home_team_ls_5}</td>
						 <td>${stateObj.attributes.home_team_ls_6}</td>
						 <td>${stateObj.attributes.home_team_ls_7}</td>
						 <td>${stateObj.attributes.home_team_ls_8}</td>
						 <td>${stateObj.attributes.home_team_ls_9}</td>
						 <td>${stateObj.attributes.home_team_runs}</td>
						 <td>${stateObj.attributes.home_team_hits}</td>
						 <td>${stateObj.attributes.home_team_errors}</td>
					   </tr>
					 </tbody>
				   </table>
				   <div class="line">${stateObj.attributes.headlines}</div}
			  </div>
			</ha-card>
		  `;
		} else if (stateObj.state == 'STATUS_SCHEDULED') {
			return html`
			  <style>
				.card { position: relative; overflow: hidden; padding: 0 16px 20px; font-weight: 400; }
				.away-team-bg { opacity: 0.08; position:absolute; top: -20%; left: -20%; width: 58%; z-index: 0; }
				.home-team-bg { opacity: 0.08; position:absolute; top: -20%; right: -20%; width: 58%; z-index: 0; }
				.card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 99; }
				.team { text-align: center; width: 35%; }
				.team img { height: 90px; }
				.name { font-size: 1.4em; margin-bottom: 4px; }
				.line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
				.gameday { font-size: 1.4em; margin-bottom: 4px; }
				.gametime { font-size: 1.1em; }
				.sub1 { font-weight: 500; font-size: 1.2em; margin: 6px 0 2px; }
				.sub1, .sub2, .sub3 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
				.last-play { font-size: 1.2em; width: 100%; white-space: nowrap; overflow: hidden; box-sizing: border-box; }
				.last-play p { display: inline-block; padding-left: 100%; margin: 2px 0 12px; animation : slide 10s linear infinite; }
				@keyframes slide { 0%   { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
				.clock { text-align: center; font-size: 1.4em; }
				.down-distance { text-align: right; font-weight: 700; }
				.kickoff { text-align: center; margin-top: -24px; }
				.probability-text { text-align: center; }
				.prob-flex { width: 100%; display: flex; justify-content: center; margin-top: 4px; }
				.away-team-probability { width: ${awayTeamProb}%; background-color: ${awayTeamColor}; height: 12px; border-radius: 0 ${probRadius}px ${probRadius}px 0; border: ${clrOut}px solid ${outColor}; border-left: 0; transition: all 1s ease-out; }
				.home-team-probability { width: ${homeTeamProb}%; background-color: ${homeTeamColor}; height: 12px; border-radius: ${probRadius}px 0 0 ${probRadius}px; border: ${clrOut}px solid ${outColor}; border-right: 0; transition: all 1s ease-out; }
				.probability-wrapper { display: flex; }
				.away-team-percent { flex: 0 0 10px; padding: 0 10px 0 0; }
				.home-team-percent { flex: 0 0 10px; padding: 0 0 0 10px; text-align: right; }
				.percent { padding: 0 6px; }
			  </style>
			  <ha-card>
				  <div class="card">
				    <img class="away-team-bg" src="${awayTeamLogo}" />
				    <img class="home-team-bg" src="${homeTeamLogo}" />
				    <div class="card-content">
					  <div class="team">
					    <img src="${awayTeamLogo}" />
					    <div class="name">${stateObj.attributes.away_team_city}<br>${stateObj.attributes.away_team_name}</div>
					    <div class="record">${stateObj.attributes.away_team_record}</div>
					    <div class="pitcher">${stateObj.attributes.away_team_starting_pitcher}</div>
					  </div>
					  <div class="gamewrapper">
					    <div class="gameday">${gameDay}</div>
					    <div class="gametime">${gameTime}</div>
					  </div>
					  <div class="team">
					    <img src="${homeTeamLogo}" />
					    <div class="name">${stateObj.attributes.home_team_city}<br>${stateObj.attributes.home_team_name}</div>
					    <div class="record">${stateObj.attributes.home_team_record}</div>
					    <div class="pitcher">${stateObj.attributes.home_team_starting_pitcher}</div>
					  </div>
				    </div>
				    <div class="line"></div>
				    <div class="sub1">
					  <div class="date">1st pitch ${stateObj.attributes.first_pitch_in}</div>
					  <div class="odds">${stateObj.attributes.odds} [ O/U: ${stateObj.attributes.overunder} ]</div>
				    </div>
				    <div class="sub2">
					  <div class="venue">${stateObj.attributes.venue_name}</div>
					  <div class="overunder">${weatherDesc}</div>
				    </div>
				    <div class="sub3">
					  <div class="location">${stateObj.attributes.venue_city}, ${stateObj.attributes.venue_state}</div>
					  <div class="network">${stateObj.attributes.tv_network}</div>
				    </div>
				    <div class="probability-text">Win Probability</div>
				    <div class="probability-wrapper">
				      <div class="away-team-percent">${awayTeamProb}%</div>
				      <div class="prob-flex">
					    <div class="away-team-probability"></div>
					    <div class="home-team-probability"></div>
				      </div>
				      <div class="home-team-percent">${homeTeamProb}%</div>
				    </div>
				  </div>
				</ha-card>
			`;

		} else if (stateObj.state == 'STATUS_POSTPONED') {
			return html`
			  <style>
				.card { position: relative; overflow: hidden; padding: 0 16px 20px; font-weight: 400; }
				.away-team-bg { opacity: 0.08; position:absolute; top: -20%; left: -20%; width: 58%; z-index: 0; }
				.home-team-bg { opacity: 0.08; position:absolute; top: -20%; right: -20%; width: 58%; z-index: 0; }
				.card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 99; }
				.team { text-align: center; width: 35%; }
				.team img { height: 90px; }
				.name { font-size: 1.4em; margin-bottom: 4px; }
				.line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
				.gameday { font-size: 1.4em; margin-bottom: 4px; }
				.gametime { font-size: 1.1em; }
				.sub1 { font-weight: 500; font-size: 1.2em; margin: 6px 0 2px; }
				.sub1, .sub2, .sub3 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
				.last-play { font-size: 1.2em; width: 100%; white-space: nowrap; overflow: hidden; box-sizing: border-box; }
				.last-play p { display: inline-block; padding-left: 100%; margin: 2px 0 12px; animation : slide 10s linear infinite; }
				@keyframes slide { 0%   { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
				.clock { text-align: center; font-size: 1.4em; }
				.down-distance { text-align: right; font-weight: 700; }
				.kickoff { text-align: center; margin-top: -24px; }
				.probability-text { text-align: center; }
				.prob-flex { width: 100%; display: flex; justify-content: center; margin-top: 4px; }
				.away-team-probability { width: ${awayTeamProb}%; background-color: ${awayTeamColor}; height: 12px; border-radius: 0 ${probRadius}px ${probRadius}px 0; border: ${clrOut}px solid ${outColor}; border-left: 0; transition: all 1s ease-out; }
				.home-team-probability { width: ${homeTeamProb}%; background-color: ${homeTeamColor}; height: 12px; border-radius: ${probRadius}px 0 0 ${probRadius}px; border: ${clrOut}px solid ${outColor}; border-right: 0; transition: all 1s ease-out; }
				.probability-wrapper { display: flex; }
				.away-team-percent { flex: 0 0 10px; padding: 0 10px 0 0; }
				.home-team-percent { flex: 0 0 10px; padding: 0 0 0 10px; text-align: right; }
				.percent { padding: 0 6px; }
			  </style>
			  <ha-card>
				  <div class="card">
				  <img class="away-team-bg" src="${awayTeamLogo}" />
				  <img class="home-team-bg" src="${homeTeamLogo}" />
				  <div class="card-content">
					<div class="team">
					  <img src="${awayTeamLogo}" />
					  <div class="name">${stateObj.attributes.away_team_city}<br>${stateObj.attributes.away_team_name}</div>
					  <div class="record">${stateObj.attributes.away_team_record}</div>
					  <div class="pitcher">${stateObj.attributes.away_team_starting_pitcher}</div>
					</div>
					<div class="gamewrapper">
					  <div class="gameday">POSTPONED</div>
<!--
					  <div class="gametime">&nbsp;</div>
-->
					</div>
					<div class="team">
					  <img src="${homeTeamLogo}" />
					  <div class="name">${stateObj.attributes.home_team_city}<br>${stateObj.attributes.home_team_name}</div>
					  <div class="record">${stateObj.attributes.home_team_record}</div>
					  <div class="pitcher">${stateObj.attributes.home_team_starting_pitcher}</div>
					</div>
				  </div>
				  <div class="line"></div>
				  <div class="sub2">
					<div class="venue">${stateObj.attributes.venue_name}</div>
					<div class="overunder">${stateObj.attributes.venue_city}, ${stateObj.attributes.venue_state}</div>
				  </div>
               <div class="sub3">
                 <div class="location">${stateObj.attributes.headlines}</div>
               </div>
				</div>
				</ha-card>
			`;

		} else if (stateObj.state == 'STATUS_IN_PROGRESS' || stateObj.state == 'STATUS_RAIN_DELAY') {
			return html`
			  <style>
				.card { position: relative; overflow: hidden; padding: 0 16px 20px; font-weight: 400; }
				.away-team-bg { opacity: 0.08; position:absolute; top: -20%; left: -20%; width: 58%; z-index: 0; }
				.home-team-bg { opacity: 0.08; position:absolute; top: -20%; right: -20%; width: 58%; z-index: 0; }
				.card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 99; }
				.team { text-align: center; width:35%; }
				.team img { height: 90px; }
				.teamls { text-align: center; }
				.teamls img { height: 15px; }
				.possession, .awayteamposs, .hometeamposs { font-size: 2.5em; text-align: center; opacity: 0; font-weight:900; }
				.awayteamposs {opacity: ${awayTeamPossOpacity} !important; }
				.hometeamposs {opacity: ${homeTeamPossOpacity} !important; }
				.score { font-size: 3em; text-align: center; }
				.divider { font-size: 2.5em; text-align: center; margin: 0 4px; }
				.name { font-size: 1.4em; margin-bottom: 4px; }
				.line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
				.bso-wrapper { display: flex;}
				.bso-flex { width: 100%; display: flex; justify-content: space-evenly; align-items: center; text-align: center; margin-top: 4px; }
				.bso-balls { margin: 0 auto; width: 33%; }
				.bso-balls div.balls:nth-child(-n + ${stateObj.attributes.balls})  { opacity: 1; }
				.bso-strikes { margin: 0 auto; width: 33%; }
				.bso-strikes div.strikes:nth-child(-n + ${stateObj.attributes.strikes})  { opacity: 1; }
				.bso-outs { margin: 0 auto; width: 33%; }
				.bso-outs div.outs:nth-child(-n + ${stateObj.attributes.outs})  { opacity: 1; }
				.balls { height: 12px; border-radius: 6px; border: ${clrOut}px solid ${outColor}; width: 10%; background-color: red; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
				.strikes { height: 12px; border-radius: 6px; border: ${clrOut}px solid ${outColor}; width: 10%; background-color: red; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
				.outs { height: 12px; border-radius: 6px; border: ${clrOut}px solid ${outColor}; width: 10%; background-color: red; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
				.bases-wrapper { display: flex; }
				.bases-flex { width: 100%; display: flex; justify-content: space-evenly; align-items: center; text-align: center; margin-top: 4px; }
				.bases-first { margin: 0 auto; width: 33%; }
				.bases-first div.first:nth-child(-n + ${runnerFirst})  { opacity: 1; }
				.bases-second { margin: 0 auto; width: 33%; }
				.bases-second div.second:nth-child(-n + ${runnerSecond})  { opacity: 1; }
				.bases-third { margin: 0 auto; width: 33%; }
				.bases-third div.third:nth-child(-n + ${runnerThird})  { opacity: 1; }
				.first { height: 12px; border-radius: 6px; border: ${clrOut}px solid ${outColor}; width: 10%; background-color: #00ff00; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
				.second { height: 12px; border-radius: 6px; border: ${clrOut}px solid ${outColor}; width: 10%; background-color: #00ff00; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
				.third { height: 12px; border-radius: 6px; border: ${clrOut}px solid ${outColor}; width: 10%; background-color: #00ff00; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
				.timeouts { margin: 0 auto; width: 70%; }
				.timeouts div.away-team-to:nth-child(-n + ${stateObj.attributes.strikes})  { opacity: 1; }
				.timeouts div.home-team-to:nth-child(-n + ${stateObj.attributes.outs})  { opacity: 1; }
				.away-team-to { height: 6px; border-radius: ${toRadius}px; border: ${clrOut}px solid ${outColor}; width: 20%; background-color: ${awayTeamColor}; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
				.home-team-to { height: 6px; border-radius: ${toRadius}px; border: ${clrOut}px solid ${outColor}; width: 20%; background-color: ${homeTeamColor}; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
				.status { text-align:center; font-size:1.6em; font-weight: 700; }
				.sub1 { font-weight: 700; font-size: 1.2em; margin: 6px 0 2px; }
				.sub1, .sub2, .sub3, .sub4 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
				.last-play { font-size: 1.2em; width: 100%; white-space: nowrap; overflow: hidden; box-sizing: border-box; }
				.last-play p { display: inline-block; padding-left: 100%; margin: 2px 0 12px; animation : slide 18s linear infinite; }
				@keyframes slide { 0%   { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
				.clock { text-align: center; font-size: 1.4em; }
				.down-distance { text-align: right; }
				.game-status { font-size: 1.4em; text-align: center; margin-top: -24px; }
				.probability-text { text-align: center; }
				.prob-flex { width: 100%; display: flex; justify-content: center; margin-top: 4px; }
				.probability-wrapper { display: flex; }
				.away-team-percent { flex: 0 0 10px; padding: 0 10px 0 0; }
				.home-team-percent { flex: 0 0 10px; padding: 0 0 0 10px; text-align: right; }
				.percent { padding: 0 6px; }
				.post-game { margin: 0 auto; }
				.batter { text-align: left; }
				.pitcher { text-align: right; }
				.venue { text-align: left; }
				.weather { text-align: right; }
				.location { text-align: left; }
				.network { text-align: right; }
				.line-score-table { width: 100%; border-collapse: collapse; text-align: center; }
				.line-score-cell { border: 0.5px solid #999; text-align: center; }
				table.ls { width: 100%; text-align: center; border: 0.5px solid #999; border-collapse: collapse; }
				th, td { border: 0.5px solid #999; text-align: center; }
				th.teamls, td.teamls { border: 0.5px solid #999; text-align: left; }
             
			  </style>
			  <ha-card>
				<div class="card">
				<img class="away-team-bg" src="${awayTeamLogo}" />
    				<img class="home-team-bg" src="${homeTeamLogo}" />
				<div class="card-content">
				  <div class="team">
					<img src="${awayTeamLogo}" />
					<div class="name">${stateObj.attributes.away_team_city}<br>${stateObj.attributes.away_team_name}</div>
					<div class="record">${stateObj.attributes.away_team_record}</div>
				  </div>
				  <div class="awayteamposs">&bull;</div>
				  <div class="score">${aScr}</div>
				  <div class="divider">-</div>
				  <div class="score">${hScr}</div>
				  <div class="hometeamposs">&bull;</div>
				  <div class="team">
					<img src="${homeTeamLogo}" />
					<div class="name">${stateObj.attributes.home_team_city}<br>${stateObj.attributes.home_team_name}</div>
					<div class="record">${stateObj.attributes.home_team_record}</div>
				  </div>
				</div>
				<div class="game-status">${stateObj.attributes.game_status}</div>
				<div class="line"></div>
				
				<div class="bso-wrapper">
				  <div class="bso-flex">
				    <div class="bso-balls">
				      BALLS&nbsp;
				      <div class="balls"></div>
				      <div class="balls"></div>
				      <div class="balls"></div>
				      <div class="balls"></div>
				    </div>
				    <div class="bso-strikes">
				      STRIKES&nbsp;
				      <div class="strikes"></div>
				      <div class="strikes"></div>
				      <div class="strikes"></div>
				    </div>
				    <div class="bso-outs">
				      OUTS&nbsp;
				      <div class="outs"></div>
				      <div class="outs"></div>
				      <div class="outs"></div>
				    </div>
			      </div>
				</div>
				<div class="bases-wrapper">
				  <div class="bases-flex">
				    <div class="bases-first">
				      1ST&nbsp;
				      <div class="first"></div>
				    </div>
				    <div class="bases-second">
				      2ND&nbsp;
				      <div class="second"></div>
				    </div>
				    <div class="bases-third">
				      3RD&nbsp;
				      <div class="third"></div>
				    </div>
			    </div>
				</div>
				<div class="sub2">
				  <div class="batter">At Bat: ${stateObj.attributes.current_batter}</div>
				  <div class="pitcher">Pitcher: ${stateObj.attributes.current_pitcher}</div>
				</div>
				<div class="line"></div>
				<div class="sub3">
				  <div class="venue">${stateObj.attributes.venue_name}</div>
				 <div class="weather">${weatherDesc}</div>
				</div>
				<div class="sub4">
				  <div class="location">${stateObj.attributes.venue_city}, ${stateObj.attributes.venue_state}</div>
				  <div class="network">${stateObj.attributes.tv_network}</div>
				</div>
				<div class="line"></div>
				<div class="last-play">
				  <p>${stateObj.attributes.last_play}</p>
				</div>
                
				<div class="probability-text">
               
				   <table class="ls">
					 <thead>
					   <tr>
						 <th class="teamls">Scoring</th>
						 <th>1</th>
						 <th>2</th>
						 <th>3</th>
						 <th>4</th>
						 <th>5</th>
						 <th>6</th>
						 <th>7</th>
						 <th>8</th>
						 <th>9</th>
						 <th>R</th>
						 <th>H</th>
						 <th>E</th>
					   </tr>
					 </thead>
					 <tbody>
					   <tr>
						 <td class="teamls"><img src="${awayTeamLogo}" style="height:15px;" />&nbsp; ${stateObj.attributes.away_team_abbr}</td>
						 <td>${stateObj.attributes.away_team_ls_1}</td>
						 <td>${stateObj.attributes.away_team_ls_2}</td>
						 <td>${stateObj.attributes.away_team_ls_3}</td>
						 <td>${stateObj.attributes.away_team_ls_4}</td>
						 <td>${stateObj.attributes.away_team_ls_5}</td>
						 <td>${stateObj.attributes.away_team_ls_6}</td>
						 <td>${stateObj.attributes.away_team_ls_7}</td>
						 <td>${stateObj.attributes.away_team_ls_8}</td>
						 <td>${stateObj.attributes.away_team_ls_9}</td>
						 <td>${stateObj.attributes.away_team_runs}</td>
						 <td>${stateObj.attributes.away_team_hits}</td>
						 <td>${stateObj.attributes.away_team_errors}</td>
					   </tr>
					   <tr>
						 <td class="teamls"><img src="${homeTeamLogo}" style="height:15px;"/>&nbsp; ${stateObj.attributes.home_team_abbr}</td>
						 <td>${stateObj.attributes.home_team_ls_1}</td>
						 <td>${stateObj.attributes.home_team_ls_2}</td>
						 <td>${stateObj.attributes.home_team_ls_3}</td>
						 <td>${stateObj.attributes.home_team_ls_4}</td>
						 <td>${stateObj.attributes.home_team_ls_5}</td>
						 <td>${stateObj.attributes.home_team_ls_6}</td>
						 <td>${stateObj.attributes.home_team_ls_7}</td>
						 <td>${stateObj.attributes.home_team_ls_8}</td>
						 <td>${stateObj.attributes.home_team_ls_9}</td>
						 <td>${stateObj.attributes.home_team_runs}</td>
						 <td>${stateObj.attributes.home_team_hits}</td>
						 <td>${stateObj.attributes.home_team_errors}</td>
					   </tr>
					 </tbody>
				   </table>
               <!-- </div> -->
				</div>
			  </div>
			  </ha-card>
			`;
		} else /*if (stateObj.state == 'Unknown')*/ {
		  return html`
			<style>
			  .card { position: relative; overflow: hidden; padding: 16px 16px 20px; font-weight: 400; }
			  .team-bg { opacity: 0.08; position: absolute; top: -50%; left: -30%; width: 75%; z-index: 0; }
			  .card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 99; }
			  .team { text-align: center; width: 50%; }
			  .team img { max-width: 90px; }
			  .name { font-size: 1.6em; margin-bottom: 4px; }
			  .line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
			  .eos { font-size: 1.8em; line-height: 1.2em; text-align: center; width: 50%; }
			</style>
			<ha-card>
			  <div class="card">
				<img class="team-bg" src="https://a.espncdn.com/i/espn/misc_logos/500/mlb.png" />
				<div class="card-content">
				  <div class="team">
					<img src="https://a.espncdn.com/i/espn/misc_logos/500/mlb.png" />
				  </div>
				  <div class="eos">No Game<br />Scheduled Today</div>
				</div>
			  </div>
			</ha-card>
		  `;
		}
	}
  }
}

customElements.define("mlb-card", MLBCard);
