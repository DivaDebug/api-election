interface CreateVoteDto {
  electoralDistrict: {
    year: number;
    type: 'mayor';
    townCode: string
    candidate: {
      no: number;
    }
  };
  votes: number;
}

export default CreateVoteDto;
