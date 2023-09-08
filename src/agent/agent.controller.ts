import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('create')
  createAgent(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.createAgent(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentService.fetchAgents();
  }

  @Get(':agentId')
  findOne(@Param('agentId') agentId: string) {
    return this.agentService.fetchAgentByAgentId(agentId);
  }

  @Delete(':agentId')
  remove(@Param('agentId') agentId: string) {
    return this.agentService.deleteAgent(agentId);
  }
}
