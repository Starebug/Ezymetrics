// After ETL processing, generate the report
const processLeadsAndCampaigns = async (leads,campaigns) => {
  try {
    const processedData = leads.map((lead) => {
      const leadSource = lead.source ? lead.source.split(' ')[0] : '';
      const campaign = campaigns.find((c) => c.Campaign_Id.includes(leadSource));
      return {
        leadName: lead.name,
        campaignName: campaign ? campaign.name : 'Unknown',
        campaignStatus: campaign ? campaign.status : 'Inactive',
      };
    });
    return processedData;
  } catch (error) {
    console.error('Error in ETL process:', error);
    throw error;
  }
};
module.exports ={processLeadsAndCampaigns};
