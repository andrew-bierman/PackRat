import * as Linking from 'expo-linking';

export const useHandleLink = () => {
  const handleGithubLink = () => {
    const githubUrl = 'github url';
    handleLink(githubUrl);
  };

  const handleDiscordLink = () => {
    const discordUrl = 'discord url';
    handleLink(discordUrl);
  };

  const handleLink = (url) => {
    Linking.openURL(url);
  };

  return {
    handleGithubLink,
    handleDiscordLink,
  };
};
export default useHandleLink;
