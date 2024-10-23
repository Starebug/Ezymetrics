const mongoose = require('mongoose');
const {ConnectDB} = require('./db');
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');
const { leads, campaigns } = require('../data/dummyData');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
ConnectDB();
const loadData = async () => {
  try {
    // Insert campaigns first and get the _id from MongoDB
    const insertedCampaigns = await Campaign.insertMany(campaigns);
    console.log('Campaigns inserted successfully!');
    const updatedLeads = leads.map((lead) => {
      const campaign = insertedCampaigns.find((c) => c.id === lead.campaignId);
      return {
        ...lead,
        campaignId: campaign ? campaign._id : null, // Use the MongoDB _id
      };
    });

    await Lead.insertMany(updatedLeads);
    console.log('Leads inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    process.exit();
  }
};

loadData();
