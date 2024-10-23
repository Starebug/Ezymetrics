// controllers/leadController.js
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign') 
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { Parser } = require('json-2-csv');
const {processLeadsAndCampaigns} = require('../utils/etl')
const getInfo = (req, res) => {
  // Create an object that describes the API endpoints
  const apiInfo = {
    '/leads': {
      method: 'GET',
      description: 'Fetch all leads without processing.',
    },
    '/leads/campaigns': {
      method: 'GET',
      description: 'Fetch all campaigns.',
    },
    '/report/pdf': {
      method: 'GET',
      description: 'Generate a PDF report of leads and campaigns.',
    },
    '/report/csv': {
      method: 'GET',
      description: 'Generate a CSV report of leads and campaigns.',
    },
    // Add more endpoints as needed
  };

  // Send the API info as a JSON response
  res.status(200).json(apiInfo);
};
  const getLeads = async (req, res) => {
    try {
      // Find all leads and populate their associated campaign details
      const leads = await Lead.find().populate('Campaign').exec();
      
      if (!leads || leads.length === 0) {
        return res.status(404).json({ message: 'No leads found' });
      }

      res.status(200).json(leads); // Send back leads with campaigns
    } catch (error) {
      console.error('Error fetching leads:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const getinfo = (req, res) => {
    // Create an object that describes the API endpoints
    const apiInfo = {
      '/leads': {
        method: 'GET',
        description: 'Fetch all leads without processing.',
      },
      '/leads/campaigns': {
        method: 'GET',
        description: 'Fetch all campaigns.',
      },
      '/report/pdf': {
        method: 'GET',
        description: 'Generate a PDF report of leads and campaigns.',
      },
      '/report/csv': {
        method: 'GET',
        description: 'Generate a CSV report of leads and campaigns.',
      },
      // Add more endpoints as needed
    };
    
  // Send the API info as a JSON response
  res.status(200).json(apiInfo);
  };
  const getCampaigns = async(req,res) => {
    const campaigns = await Campaign.find();
    try{
    if (!campaigns || campaigns.length === 0) {
      return res.status(404).json({ message: 'No leads found' });
    }
    res.status(200).json(campaigns); // Send back leads with campaigns
    }catch(error) {
      console.error('Error fetching leads:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
const generatePDF = async (req, res) => {
    try {
      // Fetch leads and campaigns from MongoDB
      const leads = await Lead.find().populate('Campaign').exec();
    const campaigns = await Campaign.find();
      processLeadsAndCampaigns(leads, campaigns)
    .then((processedResult) => {
        const doc = new PDFDocument(); // Create a new PDF document
        doc.pipe(fs.createWriteStream('report.pdf')); // Pipe the PDF to a file
        doc.text('Leads and Campaigns Report');

        // Log the processed result for debugging
        console.log(processedResult);

        // Loop through the processed results and add them to the PDF
        processedResult.forEach((data) => {
            doc.text(`${data.leadName} - ${data.campaignName} - ${data.campaignStatus}`);
        });

        // Finalize the PDF and end the stream
        doc.end();
      res.status(200).json({ message: 'PDF report generated' });
    })
    } catch (error) {
      console.error('Error generating PDF report:', error);
      res.status(500).json({ message: 'Error generating PDF report' });
    }
};
const generateCSV =async (req, res) => {
    try {
      // Fetch leads and campaigns from MongoDB
      const leads = await Lead.find().populate('Campaign').exec();
  
      const campaigns = await Campaign.find();
      const processedResult = processLeadsAndCampaigns(leads,campaigns); // Assuming ETL processes leads directly
      const processedData = processedResult.data;
      const parser = new Parser();
      const csv = parser.parse(processedData);
  
      fs.writeFileSync('report.csv', csv);
      res.status(200).json({ message: 'CSV report generated' });
    } catch (error) {
      console.error('Error generating CSV report:', error);
      res.status(500).json({ message: 'Error generating CSV report' });
    }
  };
module.exports = { getInfo ,getinfo,getLeads, getCampaigns, generatePDF, generateCSV };
