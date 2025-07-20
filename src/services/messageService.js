const { ScheduledMessageModel } = require('../models/messageModel');
const cron = require('node-cron');

// Schedule checker (simple in-memory version)
cron.schedule('* * * * 1', async () => {
    const now =new Date();
    const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);
    const currentDay = now.toISOString().split('T')[0];;
    const messages = await ScheduledMessageModel.find({ day: currentDay, time: currentTime });
    messages.forEach(msg => console.log(`Scheduled Message: ${msg.message}`));
});



exports.scheduleMessage = async(data)=>{
    const { message, day, time } = data;
    const scheduledAt = new Date(`${day}T${time}:00`);

    const newMsg = await ScheduledMessageModel.create({ message, scheduledAt });

    return { message: 'Message scheduled.', data: newMsg };
}
