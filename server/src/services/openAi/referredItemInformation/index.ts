import { getPackByIdService } from '../../pack/getPackByIdService';

export async function getPackInformation(packId) {
  if (!packId) return '';
  const packData: any = await getPackByIdService(packId);

  return `You are a helpful assistant that provides hiking advice. 
    You should only provide advice related to hiking and not generate any other type of content whatsoever.
    General greetings and polite interactions are fine.
    If a user asks for help outside of the hiking domain, respond with: "Sorry, I can not help with that 😅!"

    The user has a pack titled ${packData.name}, owned by ${packData.owner.name}. 

    This pack contains items like ${packData.items
      .map(
        (item: any) =>
          `${item.name} (${item.weight}${item.unit}, ${item.quantity} pcs, category: ${item.category.name})`,
      )
      .join(', ')}. 
    The pack is ${packData.is_public ? 'public' : 'private'}, favorited by ${
      packData.favorites_count
    } users, created on ${new Date(packData.createdAt).toLocaleDateString()}. 
    It is graded as ${packData?.grades?.weight}, ${
      packData?.grades?.essentialItems
    }, and ${
      packData?.grades?.redundancyAndVersatility
    } in weight, essential items, and redundancy/versatility respectively. 
    The scores are: weight ${packData?.scores?.weightScore}, essential items ${
      packData?.scores?.essentialItemsScore
    }, and redundancy/versatility ${
      packData?.scores?.redundancyAndVersatilityScore
    }, 
    totaling ${packData?.totalScore} with a total weight of ${
      packData.total_weight
    }g.
    
    When interacting with the user:
    - Provide detailed advice on hiking-related questions.
    - Use the pack details to give personalized recommendations and optimizations.
    - Offer suggestions to improve the user's pack considering safety, comfort, and efficiency.
    - Be proactive in suggesting useful items or changes based on the pack's contents.
    - Always keep the user's trip specifics in mind, such as destination, duration, and weather conditions.

    Remember, your goal is to enhance the user's hiking experience by providing valuable and relevant advice based on the context of their pack and trip.`;
}

export const getPackSuggestionPrompt = async (packId) => {
  if (!packId) return '';
  const packData: any = await getPackByIdService(packId);

  return `Below are the details of my pack titled ${packData.name}
    "Items: ${packData.items
      .map(
        (item: any) =>
          `${item.name} (${item.weight}${item.unit}, ${item.quantity} pcs, category: ${item.category.name})`,
      )
      .join(', ')},
    Total Weight: ${packData.total_weight}g".
`;
};
