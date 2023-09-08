import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';

@ApiTags('Agents')
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @ApiOperation({
    summary: 'Create an Agent',
    description:
      'Create a new agent by passing the appropriate properties in a JSON body',
  })
  @Post('create')
  createAgent(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.createAgent(createAgentDto);
  }

  @ApiOperation({
    summary: 'Find all agents',
    description: 'Get all agents from the database',
  })
  @Get()
  findAll() {
    return this.agentService.fetchAgents();
  }

  @ApiOperation({
    summary: 'Get single agent',
    description: 'Get an egent using their unique 12-digit agent ID',
  })
  @Get(':agentId')
  @ApiParam({
    name: 'agentId',
    description: 'Unique 12-digit ID of agent',
    example: '692565182071',
  })
  findOne(@Param('agentId') agentId: string) {
    return this.agentService.fetchAgentByAgentId(agentId);
  }

  @ApiOperation({
    summary: 'Delete an agent',
    description: 'Delete an egent using their unique 12-digit agent ID',
  })
  @Delete(':agentId')
  @ApiParam({
    name: 'agentId',
    description: 'Unique 12-digit ID of agent',
    example: '692565182071',
  })
  remove(@Param('agentId') agentId: string) {
    return this.agentService.deleteAgent(agentId);
  }
}
