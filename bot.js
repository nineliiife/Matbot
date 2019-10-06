const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const settings = require('./auth.json');
const matId = '329291391320588300';
const myId = '291710529981120524';
const seanId = '275680282122649600';
const nikoId = '211639443923140610';
var heightFeet = 6;
var heightInches = 0;
client.on('ready',() => {
	console.log('I\'m Online\nI\'m Online');
});

client.on('guildMemberAdd', member =>{
	client.channels.get("617838839326703640").send("Shit, more people to bully me");
});

client.on('message', message => {
	if (message.author === client.user) return;
	
	if(message.content.startsWith("replay")){
			var replayString = message.content.split(' ')[1];
			var https = require('https');
			console.log("something");
			var options = {
				host: 'replay.pokemonshowdown.com',
				post: 80,
				path: '/'+replayString+'.log',

			};
			var req = https.get(options, function(res) {
			  console.log(res);  console.log('STATUS: ' + res.statusCode);
			  console.log('HEADERS: ' + JSON.stringify(res.headers));
			  res.setEncoding('utf8');
			  res.on('data', function (chunk) {
				 printChunk(chunk, message.channel);
			  });
			});
	};
	
	if(message.content.startsWith("eihl")){
			var replayString = message.content.split(' ')[1];
			var https = require('https');
			console.log("something");
			var options = {
				host: 'eihlhq.co.uk',
				post: 80,
				path: '/pdf/print/de-html/'+replayString,

			};
			var req = https.get(options, function(res) {
				console.log(res.data);
			 // console.log(res);  console.log('STATUS: ' + res.statusCode);
			//  console.log('HEADERS: ' + JSON.stringify(res.headers));
			  res.setEncoding('utf8');
			  res.on('data', function (chunk) {
				 splitLog = chunk.split("\n");
				 sanityString = SantiseLogs(splitLog);
				 printChunks(sanityString, message.channel);
			  });
			});
	};

    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	message.content = message.content.toUpperCase();
    if(message.content.includes("MAT")){
		message.channel.send(":sob: stop bullying me");
		//message.author.send("I'm in your brain");
	}
	if (message.channel.type == "dm") {
    message.author.send("You are DMing me now!");
    return;
  }
	if(message.content.includes("APPLE")){
		message.channel.send("You mean apel, right?");
	}
	if(message.content.includes("DUGTRIO")){
		message.channel.send("DUGTRIO IS A FINE FIRST ROUND PICK");
	}
	
	if((message.content.startsWith("MAT SAY THIS"))){
		//this is where we'd create mat speak
		var translation = message.content.substring(12);
		var words = translation.split(" ");
		var returnMessage = "";
		words.forEach(function(w){
			w = ShortenWord(w);
			returnMessage+=w;
		})
		message.channel.send(returnMessage);
	}
	
	if((message.content.includes("NEW GAME"))){
		message.channel.send(GetRandomNewGameSpoiler());
	}
	
	if(message.member.id===nikoId){
				var d = Math.random();
		if(d < 0.1){
		message.channel.send("NIKO I LOVE YOU, SHOW ME YOUR BUM");
		}
	}
	
	 if(message.member.id===matId){
		var d = Math.random();
		if(d < 0.45){
			//this is where we'd create mat speak
			var words = message.content.split(' ');
			var returnMessage = "";
			words.forEach(function(w){
				w = ShortenWord(w);
				returnMessage+=w;
			})
			message.channel.send(returnMessage); 
		}
	 }
	 
	 if(message.content.includes("HEIGHT") ||message.content.includes("SMALL")||message.content.includes("SHORT")||message.content.includes("SMOL")){
		 message.channel.send("DID SOMEONE MENTION MY HEIGHT, I'LL HAVE YOU KNOW I'M " + heightFeet +"\"" + heightInches + " TALL!");
		 heightInches=heightInches-1;
		 if(heightInches<0){
			 heightFeet=heightFeet-1;
			 heightInches=11;
		 }
	 }
	 
/*	 if(message.content.includes("EXECUTE ORDER 66") &&message.member.id === myId){
		  message.guild.members.get(matId).kick()
	 }*/
	 
	 	 if(message.content.includes("JOB") ||message.content.includes("INTERVIEW")||message.content.includes("EMPLOY")){
		 message.channel.send("DON'T MENTION JOBS, I'M UNEMPLOYED AND POOR");
	 }

		 if(message.content.includes("BIRTHDAY")){
			message.channel.send("I'M TOO SMALL TO REACH MY CAKE");
	 }	
	 
	 		 if(message.content.includes("KELDEO")){
			message.channel.send("STUPID DONKEY");
	 }	
});
client.login(settings.token);

function ShortenWord(word){
	var letters = word.split('');
	var returnString = "";
	letters.forEach(function(letter){
		if(!returnString.includes(letter)){
			returnString+=letter;
		}
	})
	returnString+=" ";
	return returnString;
}

function SantiseLogs(logs){
	var returnVal = "";
	logs.forEach(function(log){
		if(log.includes("move")){
			returnVal+='\n'+log;
		}else if(log.includes("faint")){
			returnVal+='\n'+log;
		}else if(log.includes("curestatus")){
			returnVal+='\n'+log;
		}else if(log.includes("turn")){
			returnVal+='\n'+log;
		}else if(log.includes("upkeep")){
			returnVal+='\n'+log;
		}
	});
	return returnVal;
}

function GetRandomNewGameSpoiler(){
	var returnQuotes = ["I am so happy small pokemon have an evasion bonus, makes me feel right at home",
						"The fact that some Galar Pidgey only have one leg is genius",
						"Masquerain was such an obvious choice for a mega evolution",
						"The football minigame looks so much fun",
						"The fact that you can now kill dragon pokemon on wifi battles in weird",
						"I'm in love with Dugnineo",
						"I'm going to defect to the Scottish faction",
						"Apsalar is such an obvious mon to be added to smash",
						"I'm going to torture people in the dungeons",
						"Why are all the pokemon taller than me?",
						"The knights of the round table as legendaries is great",
						"I'm going to kill Nessie",
						"Why are all the Welsh pokemon sheep?"];
	return returnQuotes[Math.floor(Math.random()*returnQuotes.length)];
}

function printChunks(splits, channel){
	split = splits.split("|upkeep");
	split.forEach(function(line){
		if(line.includes("|faint")){
			channel.send(line);
		}		
	});
}

function printChunk(chunk, channel){
	console.log(chunk);
	fs.writeFile("/tmp/test", chunk, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
}